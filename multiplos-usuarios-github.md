# Configuração de Múltiplos Usuários do GitHub na Mesma Máquina

Este guia explica como configurar e utilizar múltiplas contas do GitHub no mesmo computador.

## Problema

Quando você precisa trabalhar com repositórios associados a diferentes contas GitHub na mesma máquina, encontra dificuldades porque:

- O Git usa uma única configuração global de usuário
- O GitHub permite apenas uma credencial por vez usando HTTPS
- Você recebe erros "Permission denied" ao tentar enviar para repositórios de outras contas

## Solução 1: GitHub CLI (Método mais simples)

O GitHub CLI (gh) oferece uma forma mais simples de alternar entre contas:

### Instalar GitHub CLI

```bash
# macOS
brew install gh

# Windows
winget install --id GitHub.cli

# Linux
sudo apt install gh  # Ubuntu/Debian
```

### Autenticar com GitHub CLI

```bash
# Iniciar processo de login
gh auth login

# Seguir instruções interativas:
# 1. Escolher GitHub.com
# 2. Escolher HTTPS ou SSH
# 3. Autorizar no navegador com o código exibido
```

Depois de autenticado, você pode facilmente mudar entre contas com o mesmo comando. O CLI gerencia as credenciais para você.

### Verificar status de autenticação

```bash
gh auth status
```

## Solução 2: Múltiplas Chaves SSH

### 1. Verificar configurações existentes

```bash
# Ver configuração de usuário atual
git config --list | grep user

# Ver chaves SSH existentes
ls -la ~/.ssh
```

### 2. Criar uma nova chave SSH para a segunda conta

```bash
# Criar nova chave SSH (substitua pelo seu email)
ssh-keygen -t ed25519 -C "seu.email@exemplo.com" -f ~/.ssh/id_ed25519_segundaconta
```

### 3. Configurar o arquivo SSH config

Adicione estas linhas ao arquivo `~/.ssh/config`:

```
# Segunda Conta GitHub
Host github.com-segundaconta
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_segundaconta
```

### 4. Adicionar a chave ao SSH agent

```bash
ssh-add ~/.ssh/id_ed25519_segundaconta
```

### 5. Adicionar a chave SSH à conta GitHub

1. Copie a chave pública:
   ```bash
   cat ~/.ssh/id_ed25519_segundaconta.pub
   ```

2. No GitHub (com a segunda conta):
   - Vá para Settings → SSH and GPG keys
   - Clique em "New SSH key"
   - Cole a chave e salve

### 6. Testar a conexão

```bash
ssh -T git@github.com-segundaconta
```

Você deve ver: "Hi SEU_USUARIO! You've successfully authenticated..."

### 7. Configurar repositório para usar a segunda conta

Ao clonar novos repositórios:
```bash
git clone git@github.com-segundaconta:OrganizacaoOuUsuario/repositorio.git
```

Para repositórios existentes:
```bash
git remote set-url origin git@github.com-segundaconta:OrganizacaoOuUsuario/repositorio.git
```

### 8. Configurar usuário por repositório (opcional)

Em cada repositório específico:
```bash
git config user.name "Seu Nome na Segunda Conta"
git config user.email "seu.email@segundaconta.com"
```

## Exemplo Prático

No nosso caso, configuramos:

1. Uma chave SSH para a conta AgentesIntegrados (email: diegodg3web@gmail.com)
2. Modificamos o arquivo config do SSH para usar esta chave com o host github.com-agentes
3. Atualizamos o remote do repositório para usar o novo host SSH
4. Realizamos o push com sucesso

---

Com esta configuração, você pode facilmente trabalhar com múltiplas contas GitHub no mesmo computador. 