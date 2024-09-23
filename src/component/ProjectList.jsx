import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const ProjectList = () => {
    const [ projectList, setProjectList ] = useState({});

    const getProjectData = async () => {
        try{
            const projects = await axios('/list');
            console.log(projects);
            setProjectList(projects.data); 
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProjectData();
    },[])

    if(projectList.length > 0){
        return (
            <div className='projectList'>
                <h2>List Page</h2>
                <table>
                    <thead>
                        <tr className='subTitle'>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectList.map(b => (
                            <tr key={b.id}>
                                <td className='center'>{b.id}</td>
                                <td><Link to={`/detail/${b.id}`}>{b.title}</Link><span className='lock'>({b.lock_type})</span></td>
                                <td>{b.writer}</td>
                                <td>{b.reg_date.substring(0, b.reg_date.indexOf("T"))}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                    <Link to={`/register`}><button className='textButton'>글쓰기</button></Link>
            </div>
        );
    }
};

export default ProjectList;