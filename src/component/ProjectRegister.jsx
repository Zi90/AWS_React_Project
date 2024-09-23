import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProjectRegister = () => {
    const [ project, setProject ] = useState({});

    const onChange = (e) => {
        const { name, value } = e.target;
        setProject({
            ...project,
            [name]:value
        });
    }

    const onReset = () => {
        setProject({
            ...project,
            title: '',
            writer: '',
            contents: ''
        })
    }

    const onCreate = async () => {
        if(project.title === ''){
            alert('title is null');
            return;
        }
        if(project.writer === ''){
            alert('wirter is null');
            return;
        }
        if(project.contents === ''){
            alert('contents is null');
            return;
        }
        if(window.confirm('등록하시겠습니까?')){
            try{
                const res = await axios.post('/insert', project);
                console.log(res);
                window.location.href = "/list";
            }catch(error){
                console.log(error);
            }
        }
    }

    return (
        <div className='projectRegister'>
            <h2>Register Page</h2>
            <div className='content'>
                <input type="text" className='content-box' name='title' value={project.title} placeholder='Title' onChange={onChange}/>
                <input type="text" className='content-box' name='writer' value={project.writer} placeholder='Writer' onChange={onChange}/>
                <div className='contentContainer'>
                <textarea type="text" className='content-box' name='contents' value={project.contents} placeholder='Contents' onChange={onChange}/>
                </div>
            </div>
            <div className='lock-radio'>
                <label for="default">
                    <label>
                    공개
                    <input name="default" id="default" type="radio" checked/>
                    </label>
                    <label>
                    비공개
                    <input name="default" type="radio"/>
                    </label>
                </label>
            </div>
            <button onClick={onCreate}>등록</button> 
            <button onClick={onReset}>초기화</button>
            <Link to={'/list'}><button>취소</button></Link> 
        </div>
    );
};

export default ProjectRegister;