//Expressの設定
const express = require("express");
const jwt = require("jsonwebtoken");

const PORT = 3000;

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//鍵
const SELECT_KEY = "abcdefg";

app.post('/login', (req, res) => {
    res.json({ message: "Login endpoint reached" });
});

//JWT発行API
app.post('/login', (req, res) => {
    console.log('POST /login request received');
    console.log('Request body:', req.body);
    //動作確認用に全ユーザーログインOK
    const payload = {
        user: req.body.user
    };
    const option = {
        expiresIn: '1m'
    }
    const token = jwt.sign(payload, SELECT_KEY, option);
    res.json({
        message: "create token",
        token: token
    });
});

//認証用ミドルウェア
const auth = (req, res, next) => {
    //リクエストヘッダー
    let token = '';
    if (req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    } else {
        return next('token none');
    }

    //トークンの検証
    jwt.verify(token, SELECT_KEY, function(err, decoded) {
        if(err) {
            //認証NGの場合
            next(err.message);
        } else {
            //認証OKの場合
            req.decoded = decoded;
            next();
        }
    })
}

//認証必須API
app.get('/user', auth, (req, res) => {
    res.send(200, `your name is ${req.decoded.user}!`);
})

//エラーハンドリング
app.use((err, req, res, next)=>{
    res.send(500, err)
})

//サーバ起動
app.listen(PORT, () => console.info('listen: ', PORT));