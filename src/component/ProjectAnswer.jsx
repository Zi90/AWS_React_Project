import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectAnswer = () => {

    const { id } = useParams();

    const [ mod, setMod ] = useState({});

    const getProject = async () => {
        try{
            const res = await axios(`/answer/${id}`);
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
        console.log(mod);
    };

    const onSubmit = async () => {
        if(window.confirm('등록하시겠습니까?')){
            try{
                const res = await axios.post(`/answer/${id}`, mod);
                console.log(res);
                window.location.href = `/detail/${id}`;
            }catch(error){
                console.log(error);
            }
        }
    };

    const onReset = () => {
        setMod({
            ...mod,
            answer: ''
        })
    }

    if(mod != null){
        return (
            <div className='projectDetailProject'>
                <div className='projectDetailContainer'>
                    <textarea type="text" className='contentContainer' value={mod.contents}/>
                </div>
                <div className='projectDetailContainer2'>
                    <textarea type="text" className='contentContainer2' name='answer' onChange={onChange}/>
                </div>
                <div>
                    <button onClick={onSubmit}>등록</button>
                    <button onClick={onReset}>초기화</button>
                    <Link to={`/detail/${id}`}><button>돌아가기</button></Link>
                </div>
            </div>
        );
    }
};

export default ProjectAnswer;