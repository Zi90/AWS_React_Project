// 설치한 라이브러리 변수로 받아오기
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

//express 사용하기 위한 app 생성
const app = express();

//express 사용할 서버포트 설정
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

//DB 접속
const db = mysql.createConnection({
    host : 'localhost',
    user: 'react',  // 생성
    password: 'mysql',
    port:'3306',
    database:'db_react'  // 생성
});

// express 접속
app.listen(PORT, ()=>{
    console.log(`server connecting on : http://localhost:${PORT}`);
});

//db 연결
db.connect((err)=>{
    if(!err){
        console.log("seccuss");

    }else{
        console.log("fail");
    }
});

// DB에서 값을 가져오기

// / => root 연결시 보여지는 기본화면 설정
app.get('/',(req, res) => {
    res.send("React Server Connect Success!!")
})

// 게시글 목록 가져오기
app.get('/list', (req, res) => {
    // console.log('/list');
    const sql = 'select * from project order by id desc';
    db.query(sql, (err, data)=>{
        if(!err){
            res.send(data);
        }else{
            console.log(err);
            res.send('전송오류');
        }
    });
});

// 게시글 하나 가져오기 : id
// 화면에서 서버로 요청하는 값 : request (req)
// 서버에서 화면으로 보내주는 값 : response (res)
// 화면에서 가져온 파라미터 추출 : req.params.id
app.get('/view/:id', (req, res) => {
    // 파라미터 가져오기
    const id = req.params.id;
    console.log(`/view/${id}`);
    const sql = `select * from project where id = ${id}`;
    db.query(sql, (err, data) => {
        if(!err){
            res.send(data);
        }else{
            console.log(err);
            res.send("전송오류");
        }
    })
});

// board 등록
app.post('/insert', (req, res) => {
    // 파라미터 가져오기 requset.body
    // const board = req.body;
    // board.title
    const { title, writer, contents, lock_type } = req.body;

    const sql = 'insert into project(title, writer, contents, lock_type) value (?,?,?,?)';
    db.query(sql, [title, writer, contents, lock_type], (err, data) => {
        if(!err){
            // res.send("OK");
            res.sendStatus(200); // 전송 잘됨
        }else{
            console.log(err);
            res.send("전송오류");
        }
    })
});

// 수정-불러오기
app.get('/modify/:id', (req, res) => {
    // 파라미터 가져오기
    const id = req.params.id;
    console.log(`/modify/${id}`);
    const sql = `select * from project where id = ${id}`;
    db.query(sql, (err, data) => {
        if(!err){
            res.send(data);
        }else{
            console.log(err);
            res.send("전송오류");
        }
    })
});

// 수정-저장
app.post('/modify/:id', (req, res) => {
    // 파라미터 가져오기 requset.body
    // const board = req.body;
    // board.title
    const id = req.params.id;

    const { title, writer, contents, lock_type } = req.body;

    const sql = `update project set title=?, writer=?, contents=?, lock_type=? where id=?`;
    db.query(sql, [title, writer, contents, lock_type, id], (err, data) => {
        if(!err){
            // res.send("OK");
            res.sendStatus(200); // 전송 잘됨
        }else{
            console.log(err);
            res.send("전송오류");
        }
    })
});

// 삭제
app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = `delete from project where id=${id}`;
    db.query(sql, (err, data) => {
        if(!err){
            // res.send("OK");
            res.sendStatus(200); // 전송 잘됨
        }else{
            console.log(err);
            res.send("전송오류");
        }
    })
});

// 댓글 - 불러오기
app.get('/comments/:postId', (req, res) => {
    // 파라미터 가져오기
    const postId = req.params.postId;
    // console.log(`/comments/${postId}`);
    const sql = `select * from comments where post_id = ? ORDER BY created_at ASC`;
    db.query(sql, [postId],(err, data) => {
        if(!err){
            res.send(data);
        }else{
            console.log(err);
            res.send("전송오류");
        }
    })
});

// 댓글 등록
app.post('/comments', (req, res) => {
    const { postId, user, content } = req.body;

    const sql = 'insert into comments(post_id, user, content) value (?,?,?)';
    db.query(sql, [ postId, user, content], (err, data) => {
        if(!err){
            // res.send("OK");
            res.sendStatus(200); // 전송 잘됨
        }else{
            console.log(err);
            res.send("전송오류");
        }
    })
});

// 댓글 - 삭제
app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM comments WHERE id = ?';
    db.query(sql, [id], (err, data) => {
        if (!err) {
            res.sendStatus(200); // 댓글 삭제 성공
        } else {
            console.log(err);
            res.send('전송오류');
        }
    });
});

//조회수
app.post('/views/:id', (req, res) => {
    const id = req.params.id;
    const sql = `update project set views = views + 1 where id = ${id}`;
    console.log(`/views/${id}`);
    db.query(sql, (err, data)=>{
        if(!err){
            res.send(data);
        }else{
            console.log(err);
            res.send('전송오류');
        }
    })
});

// 비밀번호 - 불러오기
app.get('/password/:id', (req, res) => {
    // 파라미터 가져오기
    const id = req.params.id;
    const sql = `select password from comments where id = ?`;
    db.query(sql, [id],(err, data) => {
        if(!err){
            res.send(data);
        }else{
            console.log(err);
            res.send("전송오류");
        }
    })
});