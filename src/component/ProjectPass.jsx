import React, { useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import cat from '../img/cat.jpg';

const ProjectPass = () => {
    const { id } = useParams();

    const [ pass, setPass ] = useState('');

    const onChange = (e) => {
        setPass(e.target.value);
    }

    const onClick = async () => {
            try{
                const res = await axios(`/password/${id}`);
                console.log(res);
                if( pass === 'ezen2024'){
                    window.location.href = `/detail/${id}`;
                }else{
                    alert('잘못 입력하셨습니다. 돌아가세요');
                    window.location.href = `/list`;
                }
            }catch(error){
                console.log(error);
            }
    };

    return (
        <div className='passContainer'>
            <h2>password = ezen2024</h2>
            <input type="password" className='content-box' name='password' placeholder='비밀번호를 입력해주세요' onChange={onChange}/>
            <button onClick={onClick}>로그인</button>
            <Link to={'/list'}><button>돌아가기</button></Link>
            <div className='cat'><img src={cat} width = '500px'/></div>
        </div>
    );
};

export default ProjectPass;