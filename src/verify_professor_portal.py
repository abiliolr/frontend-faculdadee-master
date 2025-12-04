from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_professor_portal(page: Page):
    print("Navigating to Professor Portal...")
    page.goto("http://localhost:4200/professor")

    # Wait for the sidebar to load
    expect(page.get_by_role("heading", name="Painel do Professor")).to_be_visible()

    # 2. Verify 'Gerenciar Provas' (Default view)
    print("Verifying Gerenciar Provas...")
    expect(page.get_by_role("heading", name="Agendar Prova")).to_be_visible()
    page.screenshot(path="/home/jules/verification/1_gerenciar_provas.png")
    print("Screenshot 1: Gerenciar Provas taken")

    # 3. Navigate to 'Atribuir Nota'
    print("Navigating to Atribuir Nota...")
    page.get_by_role("link", name="Atribuir Nota").click()
    expect(page.get_by_role("heading", name="Lançar Nota")).to_be_visible()
    page.screenshot(path="/home/jules/verification/2_atribuir_nota.png")
    print("Screenshot 2: Atribuir Nota taken")

    # 4. Navigate to 'Frequência'
    print("Navigating to Frequência...")
    page.get_by_role("link", name="Frequência").click()
    expect(page.get_by_role("heading", name="Registro de Frequência")).to_be_visible()
    expect(page.locator("table")).to_be_visible()

    # Optional: Click the toggle button to see if it works (visually, though we can't see the alert)
    # But we can check if the status text changes if we implemented it that way.
    # The current implementation just toggles a boolean, let's verify the text.
    # João Silva starts as Presente.
    joao_row = page.locator("tr", has_text="João Silva")
    expect(joao_row.locator(".status-presente")).to_be_visible()

    joao_row.get_by_role("button", name="Alternar").click()
    # Now should be Falta
    expect(joao_row.locator(".status-falta")).to_be_visible()

    page.screenshot(path="/home/jules/verification/3_frequencia.png")
    print("Screenshot 3: Frequencia taken")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_professor_portal(page)
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="/home/jules/verification/error.png")
        finally:
            browser.close()
