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
  attendance: [],
  exams: [] // Novo recurso para provas
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
    // Atualizado com mais disciplinas a pedido do usuário
    db.data.subjects.push(
      { id: 101, name: 'Matemática', professorId: 2 },
      { id: 102, name: 'Português', professorId: 2 },
      { id: 103, name: 'Desenvolvimento Web II', professorId: 2 },
      { id: 104, name: 'Banco de Dados', professorId: 2 },
      { id: 105, name: 'Engenharia de Software', professorId: 2 },
      { id: 106, name: 'Estrutura de Dados', professorId: 2 }
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
  console.log('Login attempt:', { username, password }); // DEBUG

  await db.read();

  const user = db.data.users.find(u => u.username === username && u.password === password);

  if (!user) {
    console.log('Login failed: Invalid credentials');
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  console.log('Login successful:', user.username);

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
  // Ajuste aqui para pegar 'login' como 'username' ou 'usuarioNome' como 'name' se vier assim do front
  // O front manda: { login, usuarioNome, email, senha }
  const { login, usuarioNome, email, senha, username, password, name, role } = req.body;

  console.log('Register payload:', req.body); // DEBUG

  // Normalização dos campos
  const finalUsername = login || username;
  const finalPassword = senha || password;
  const finalName = usuarioNome || name;
  const finalRole = role || 'student';

  if (!finalUsername || !finalPassword) {
      console.log('Register failed: Missing fields');
      return res.status(400).json({ message: 'Login e senha são obrigatórios' });
  }

  await db.read();

  if (db.data.users.find(u => u.username === finalUsername)) {
    return res.status(400).json({ message: 'Usuário já existe' });
  }

  const newUser = {
    id: Date.now(),
    username: finalUsername,
    password: finalPassword, // Em prod, hash a senha!
    name: finalName,
    email: email || '',
    role: finalRole
  };

  db.data.users.push(newUser);
  await db.write();

  console.log('User registered:', newUser);
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
// MODIFICADO: Retorna todas as disciplinas, preenchendo com nota se houver
app.get('/api/alunos/:id/boletim', authenticate, async (req, res) => {
  const studentId = parseInt(req.params.id);
  await db.read();

  // Pega todas as disciplinas disponíveis
  const allSubjects = db.data.subjects;

  // Mapeia cada disciplina para um objeto de nota do aluno (existente ou vazio)
  const boletim = allSubjects.map(subject => {
    // Tenta achar a nota desse aluno nessa disciplina
    const grade = db.data.grades.find(g => g.studentId === studentId && g.subjectId === subject.id);

    if (grade) {
      return {
        ...grade,
        subjectName: subject.name
      };
    } else {
      // Se não tem nota, retorna estrutura vazia mas com o nome da disciplina
      return {
        id: null,
        studentId: studentId,
        subjectId: subject.id,
        value: null, // Indica sem nota
        subjectName: subject.name
      };
    }
  });

  res.json(boletim);
});

// Frequência do Aluno
// MODIFICADO: Retorna todas as disciplinas, preenchendo com frequência se houver
app.get('/api/alunos/:id/frequencia', authenticate, async (req, res) => {
  const studentId = parseInt(req.params.id);
  await db.read();

  const allSubjects = db.data.subjects;

  const frequencia = allSubjects.map(subject => {
    const att = db.data.attendance.find(a => a.studentId === studentId && a.subjectId === subject.id);

    if (att) {
      return {
        ...att,
        subjectName: subject.name
      };
    } else {
      // Padrão se não tiver registro: 40 aulas (mock), 0 faltas
      return {
        id: null,
        studentId: studentId,
        subjectId: subject.id,
        absences: 0,
        totalClasses: 40,
        subjectName: subject.name
      };
    }
  });

  res.json(frequencia);
});

// 3. PROFESSORES
// Listar disciplinas de um professor
app.get('/api/professores/:id/disciplinas', authenticate, async (req, res) => {
  const professorId = parseInt(req.params.id);
  await db.read();

  // Se for ID 2 (Professor Mock), retorna as dele.
  // Se for outro professor (criado depois), retorna vazio ou todas para teste?
  // Vamos assumir que novos professores veem todas as disciplinas por enquanto (simplificação)
  // ou criar disciplinas padrão para eles.
  // Melhor: Se não achar disciplinas específicas, retorna todas para que ele possa lançar notas.
  let subjects = db.data.subjects.filter(s => s.professorId === professorId);

  if (subjects.length === 0) {
     // Fallback: Professor vê todas as disciplinas (para simplificar o teste do usuário)
     subjects = db.data.subjects;
  }

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
  const existingGradeIndex = db.data.grades.findIndex(g => g.studentId === studentId && g.subjectId === subjectId);

  if (existingGradeIndex >= 0) {
      // Atualiza
      db.data.grades[existingGradeIndex].value = value;
      await db.write();
      return res.status(200).json(db.data.grades[existingGradeIndex]);
  } else {
      // Cria nova
      const newGrade = {
        id: Date.now(),
        studentId,
        subjectId,
        value
      };
      db.data.grades.push(newGrade);
      await db.write();
      return res.status(201).json(newGrade);
  }
});

// --- PROVAS (CALENDÁRIO) ---

// Listar todas as provas (para Aluno e Professor verem)
app.get('/api/provas', authenticate, async (req, res) => {
  await db.read();

  // Enriquecer com o nome da disciplina
  const exams = db.data.exams.map(e => {
      const subject = db.data.subjects.find(s => s.id === e.subjectId);
      return {
          ...e,
          subjectName: subject ? subject.name : 'Desconhecida'
      };
  });

  res.json(exams);
});

// Agendar Prova (Professor)
app.post('/api/provas', authenticate, async (req, res) => {
  const { subjectId, name, date, time } = req.body;

  if (!subjectId || !name || !date || !time) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  await db.read();

  const newExam = {
      id: Date.now(),
      subjectId: parseInt(subjectId),
      name,
      date,
      time
  };

  db.data.exams.push(newExam);
  await db.write();

  res.status(201).json(newExam);
});


// Iniciar Servidor
app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
  console.log(`Frontend permitido: http://localhost:4200`);
});
