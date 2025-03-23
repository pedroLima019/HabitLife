# 🏋️ **Habit Tracker - Gerenciador de Hábitos**

**Habit Tracker** é um aplicativo que ajuda os usuários a gerenciar e acompanhar seus hábitos diários, semanais e mensais. Com funcionalidades de gamificação, estatísticas de desempenho e lembretes, o aplicativo visa aumentar a produtividade e a consistência dos usuários.

## 🎯 **Funcionalidades**

### 🔹 **1. Autenticação e Usuários**
- O usuário pode **criar uma conta** com nome, e-mail e senha.
- O usuário pode **fazer login** com e-mail e senha.
- O sistema utiliza **tokens JWT** para autenticação.
- O usuário pode **atualizar seus dados**, incluindo nome, senha e foto de perfil.

### 🔹 **2. Gerenciamento de Hábitos**
- O usuário pode **criar hábitos**, com as seguintes informações:
  - **Nome do hábito** (ex: "Beber 2L de água")
  - **Descrição** (opcional)
  - **Periodicidade** (Diário, Semanal, Mensal)
  - **Hora recomendada** para execução do hábito
  - **Categoria** (ex: Saúde, Produtividade, Estudos)
- O usuário pode **marcar um hábito como concluído** no dia.
- O sistema exibe um **histórico** dos hábitos completados.
- O usuário pode **editar e excluir hábitos**.

### 🔹 **3. Notificações e Lembretes**
- O usuário pode ativar **lembretes de hábitos**, recebendo notificações ou e-mails.
- O sistema envia **relatórios semanais** sobre o progresso dos hábitos.

### 🔹 **4. Dashboard e Estatísticas**
- O usuário pode visualizar um **gráfico de desempenho**, com base nos hábitos completados.
- O sistema exibe a **porcentagem de hábitos concluídos** por período (diário, semanal, mensal).
- O usuário pode ver quais hábitos estão sendo **mais cumpridos**.

### 🔹 **5. Sistema de Gamificação (Opcional)**
- O usuário ganha **pontos de XP** ao completar hábitos.
- O sistema pode ter **níveis** (ex: Iniciante → Intermediário → Expert).
- Pode incluir **badges** (ex: "Hábito Diário", "Mestre da Disciplina").

---

## 🔧 **Tecnologias Utilizadas**

- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript
  
  
- **Backend**:
  - Node.js
  - Express.js
  - **PostgreSQL** (banco de dados)
  
- **Segurança**:
  - **bcrypt** (criptografia de senhas)
  - **JWT** (para autenticação)

- **Arquitetura**:
  - **MVC** (Model-View-Controller)
  
---

## 🏁 **Como Rodar o Projeto Localmente**

### **1. Clone o repositório**

```bash
git clone https://github.com/seu-usuario/habit-tracker.git
