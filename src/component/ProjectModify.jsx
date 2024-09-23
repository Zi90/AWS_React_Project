import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectModify = () => {

    const { id } = useParams();

    const [ mod, setMod ] = useState({
        title: '',
        writer: '',
        contents: '',
        reg_date: ''
    });

    const { title, writer, contents, reg_date } = mod;

    const getProject = async () => {
        try{
            const res = await axios(`/modify/${id}`);
            setMod(res.data[0]);
            console.log(res);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(()=>{
        getProject();
    },[]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setMod({
            ...mod,
            [name]:value
        });
    };

    const onSubmit = async () => {
        if(title === ''){
            alert('title is null');
            return;
        }
        if(writer === ''){
            alert('wirter is null');
            return;
        }
        if(contents === ''){
            alert('contents is null');
            return;
        }
        if(window.confirm('수정하시겠습니까?')){
            try{
                const res = await axios.post(`/modify/${id}`, mod);
                console.log(res);
                window.location.href = `/detail/${id}`;
            }catch(error){
                console.log(error);
            }
        }
    };

    if(mod != null){
        return (
            <div className='projectRegister'>
            <h2>Modify Page</h2>
            <div className='content'>
                <input type="text" className='content-box' name='reg_date' value={reg_date.substring(0, reg_date.indexOf("T"))}/>
                <input type="text" className='content-box' name='title' placeholder='Title' value={title} onChange={onChange}/>
                <input type="text" className='content-box' name='writer' placeholder='Writer' value={writer} onChange={onChange}/>
                <div className='contentContainer'>
                <textarea type="text" className='content-box' name='contents' placeholder='Contents' value={contents} onChange={onChange}/>
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
            <button onClick={onSubmit}>수정</button>
            <Link to={'/list'}><button>취소</button></Link> 
        </div>
        );
    }
};

export default ProjectModify;