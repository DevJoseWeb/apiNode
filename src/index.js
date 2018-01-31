const express = require('express');
const bodyParser = require('body-parser');

const multer = require('multer');
const fs = require('fs');

const getStat = require('util').promisify(fs.stat);

//app.use(express.static('public'));
// 10 * 1024 * 1024 // 10MB
// usamos um buffer minúsculo! O padrão é 64k
const highWaterMark =  2;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/controllers/index')(app);

app.get('/audio', async (req, res) => {

    const filePath = '../mp3/Musica-1517306300713.mp3';
	
    const stat = await getStat(filePath);
    console.log(stat);    
    
    // informações sobre o tipo do conteúdo e o tamanho do arquivo
    res.writeHead(200, {
        'Content-Type': 'audio/mp3',
        'Content-Length': stat.size
    });

    const stream = fs.createReadStream(filePath, { highWaterMark });

    // só exibe quando terminar de enviar tudo
    stream.on('end', () => console.log('ACABOU DE TORAR'));

    // faz streaming do audio 
    stream.pipe(res);
});

//app.listen(3000);
app.listen(3000, () => console.log('SERVIDOR NODE ATIVO NA 3000'));
