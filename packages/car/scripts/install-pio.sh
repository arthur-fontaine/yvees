if command -v pio &> /dev/null
then
    echo "PlatformIO is already installed"
    exit 0
fi

sudo apt-get install python3.9-venv -y
curl -fsSL -o get-platformio.py https://raw.githubusercontent.com/platformio/platformio-core-installer/master/get-platformio.py
python3 get-platformio.py

if command -v fish &> /dev/null
then
    fish -c "set -U fish_user_paths /home/vscode/.platformio/penv/bin \$fish_user_paths"
fi
