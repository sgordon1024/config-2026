#!/bin/bash

# Config 2026 — Setup Script
# Run this once to get everything installed.

set -e

REPO="https://github.com/sgordon1024/config-2026.git"
INSTALL_DIR="$HOME/config-2026"

# ── Colors ────────────────────────────────────────────────────────────────────
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RESET='\033[0m'

ok()   { echo -e "${GREEN}✓ $1${RESET}"; }
info() { echo -e "${BLUE}→ $1${RESET}"; }
warn() { echo -e "${YELLOW}! $1${RESET}"; }

echo ""
echo "  Config 2026 — Setup"
echo "  ────────────────────"
echo ""

# ── Homebrew ──────────────────────────────────────────────────────────────────
if command -v brew &>/dev/null; then
  ok "Homebrew already installed"
else
  info "Installing Homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

  # Add brew to PATH for Apple Silicon Macs
  if [[ -f /opt/homebrew/bin/brew ]]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> "$HOME/.zprofile"
  fi

  ok "Homebrew installed"
fi

# ── Node.js ───────────────────────────────────────────────────────────────────
if command -v node &>/dev/null; then
  ok "Node.js already installed ($(node -v))"
else
  info "Installing Node.js..."
  brew install node
  ok "Node.js installed"
fi

# ── Git ───────────────────────────────────────────────────────────────────────
if command -v git &>/dev/null; then
  ok "Git already installed"
else
  info "Installing Git..."
  brew install git
  ok "Git installed"
fi

# ── Claude Code ───────────────────────────────────────────────────────────────
if command -v claude &>/dev/null; then
  ok "Claude Code already installed"
else
  info "Installing Claude Code..."
  npm install -g @anthropic-ai/claude-code
  ok "Claude Code installed"
fi

# ── Clone repo ────────────────────────────────────────────────────────────────
if [[ -d "$INSTALL_DIR" ]]; then
  ok "Repo already cloned at $INSTALL_DIR"
else
  info "Cloning project..."
  git clone "$REPO" "$INSTALL_DIR"
  ok "Project cloned to $INSTALL_DIR"
fi

# ── Install dependencies ──────────────────────────────────────────────────────
info "Installing project dependencies..."
cd "$INSTALL_DIR"
npm install
ok "Dependencies installed"

# ── Done ──────────────────────────────────────────────────────────────────────
echo ""
echo "  ────────────────────"
echo -e "  ${GREEN}All done! Here's what to do next:${RESET}"
echo ""
echo "  1. Open a terminal and run:"
echo ""
echo "       cd ~/config-2026"
echo "       claude"
echo ""
echo "  2. In a second terminal tab, start the preview:"
echo ""
echo "       cd ~/config-2026"
echo "       npm run dev"
echo ""
echo "  3. Open http://localhost:3000 in your browser"
echo ""
echo "  Then find your prompt in PROMPTS.md and paste it into Claude."
echo ""
