if [ "$1" == "" ]; then
    echo "usage: $0 <password>"
    exit 1
fi

node mongo.js "$1" "Arto Hellas" "040-123456"
node mongo.js "$1" "Ada Lovelace" "39-44-5323523"
node mongo.js "$1" "Dan Abramov" "12-43-234345"
node mongo.js "$1" "Mary Poppendieck" "39-23-6423122"
node mongo.js "$1" "Matti M" "11-22-3333"
node mongo.js "$1" "Mika Missa" "11-22-33-44"
