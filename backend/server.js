import express from 'express';
import cors from 'cors';
import { JSONFilePreset } from 'lowdb/node';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 3000;
const SECRET_KEY = 'minha_chave_secreta_super_segura'; // Em prod, usar env var

// Middleware Log para Debug
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware CORS
app.use(cors({
  origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Banco de Dados (LowDB)
const defaultData = {
  users: [],
  subjects: [],
  grades: [],
  attendance: []
};

// Inicializa o DB com dados padrão se o arquivo não existir
const db = await JSONFilePreset('db.json', defaultData);

// --- SEED (Dados Iniciais) ---
async function seedDatabase() {
  await db.read();

  if (db.data.users.length === 0) {
    console.log('Banco vazio. Criando dados iniciais...');

    // 1. Usuários
    db.data.users.push(
      { id: 1, username: 'admin', password: '123', role: 'admin', name: 'Administrador do Sistema' },
      { id: 2, username: 'prof', password: '123', role: 'professor', name: 'Prof. Girafales' },
      { id: 3, username: 'aluno', password: '123', role: 'student', name: 'Roberto Bolaños' }
    );

    // 2. Disciplinas (Ligadas ao Professor)
    db.data.subjects.push(
      { id: 101, name: 'Matemática', professorId: 2 },
      { id: 102, name: 'Português', professorId: 2 }
    );

    // 3. Notas (Ligadas ao Aluno e Disciplina)
    db.data.grades.push(
      { id: 1, studentId: 3, subjectId: 101, value: 8.5 },
      { id: 2, studentId: 3, subjectId: 102, value: 6.0 }
    );

    // 4. Frequência
    db.data.attendance.push(
      { id: 1, studentId: 3, subjectId: 101, absences: 2, totalClasses: 40 },
      { id: 2, studentId: 3, subjectId: 102, absences: 0, totalClasses: 40 }
    );

    await db.write();
    console.log('Seed concluído!');
  }
}

// Executa o seed ao iniciar
await seedDatabase();

// --- ENDPOINTS ---

// 1. AUTH
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  await db.read();

  const user = db.data.users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  // Gera um token simples
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role, name: user.name },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      role: user.role
    }
  });
});

app.post('/api/auth/register', async (req, res) => {
  const { username, password, name, role } = req.body;
  await db.read();

  if (db.data.users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Usuário já existe' });
  }

  const newUser = {
    id: Date.now(),
    username,
    password, // Em prod, hash a senha!
    name,
    role: role || 'student'
  };

  db.data.users.push(newUser);
  await db.write();

  res.status(201).json({ message: 'Usuário criado com sucesso' });
});

// Middleware de Autenticação (Opcional para simplicidade, mas boa prática)
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token não fornecido' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Token inválido' });
  }
};

// 2. ALUNOS
// Listar todos os alunos (Apenas para Admin ou Professor)
app.get('/api/alunos', authenticate, async (req, res) => {
  await db.read();
  const students = db.data.users.filter(u => u.role === 'student');
  res.json(students);
});

// Boletim (Notas do Aluno)
app.get('/api/alunos/:id/boletim', authenticate, async (req, res) => {
  const studentId = parseInt(req.params.id);
  await db.read();

  // Busca as notas e junta com o nome da disciplina
  const studentGrades = db.data.grades
    .filter(g => g.studentId === studentId)
    .map(g => {
      const subject = db.data.subjects.find(s => s.id === g.subjectId);
      return {
        ...g,
        subjectName: subject ? subject.name : 'Desconhecida'
      };
    });

  res.json(studentGrades);
});

// Frequência do Aluno
app.get('/api/alunos/:id/frequencia', authenticate, async (req, res) => {
  const studentId = parseInt(req.params.id);
  await db.read();

  const studentAttendance = db.data.attendance
    .filter(a => a.studentId === studentId)
    .map(a => {
      const subject = db.data.subjects.find(s => s.id === a.subjectId);
      return {
        ...a,
        subjectName: subject ? subject.name : 'Desconhecida'
      };
    });

  res.json(studentAttendance);
});

// 3. PROFESSORES
// Listar disciplinas de um professor
app.get('/api/professores/:id/disciplinas', authenticate, async (req, res) => {
  const professorId = parseInt(req.params.id);
  await db.read();

  const subjects = db.data.subjects.filter(s => s.professorId === professorId);
  res.json(subjects);
});

// Lançar Nota
app.post('/api/notas', authenticate, async (req, res) => {
  const { studentId, subjectId, value } = req.body;

  // Validação simples
  if (value < 0 || value > 10) {
    return res.status(400).json({ message: 'Nota deve ser entre 0 e 10' });
  }

  await db.read();

  // Verifica se já existe nota para essa disciplina/aluno
  // Simplificação: Vamos apenas adicionar uma nova entrada ou atualizar se tiver ID
  // Mas para o MVP, vamos adicionar nova.

  const newGrade = {
    id: Date.now(),
    studentId,
    subjectId,
    value
  };

  db.data.grades.push(newGrade);
  await db.write();

  res.status(201).json(newGrade);
});

// Iniciar Servidor
app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
  console.log(`Frontend permitido: http://localhost:4200`);
});
