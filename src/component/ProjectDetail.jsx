import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectDetail = () => {

    const { id } = useParams();

    const [ project, setProject ] = useState(null);

    const getProject = async () => {
        try{
            const res = await axios(`/view/${id}`);
            setProject(res.data[0]);
            console.log(res);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(()=>{
        getProject();
    },[]);

    const onDelete = async () => {
        if(window.confirm('삭제하시겠습니까?')){
            try{
                await axios.post(`/delete/${id}`);
                window.location.href = `/list`;
            }catch(error){
                console.log(error);
            }
        }
    };

    if(project != null){
        return (
            <div className='projectDetailProject'>
                <h2>No.{project.id} / Detail Page</h2>
                <div className='QA'>Q :</div>
                <div className='projectDetailContainer'>
                    <span>{project.title}</span>
                    <span className='bold'>{project.writer} [{project.reg_date.substring(0, project.reg_date.indexOf("T"))}]</span>
                    <div>{project.contents}</div>
                </div>
                <div>
                    <Link to = {`/modify/${project.id}`}><button>수정</button></Link>
                    <button onClick = {onDelete}>삭제</button>
                </div>
                <div className='QA'>A :</div>
                <div className='projectDetailContainer answerSpan'>
                    <span>[{project.answer}]</span>
                </div>
                <div>
                    <Link to = {`/answer/${project.id}`}><button>답변</button></Link>
                    <Link to={'/list'}><button>돌아가기</button></Link>
                </div>
            </div>
        );
    }
};

export default ProjectDetail;