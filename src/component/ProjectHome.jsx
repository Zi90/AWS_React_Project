import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectList from './ProjectList';
import '../component/project-style.css';
import ProjectDetail from './ProjectDetail';
import ProjectRegister from './ProjectRegister';
import ProjectModify from './ProjectModify';
import ProjectAnswer from './ProjectAnswer';
import pink from '../img/pink.jpg';

const ProjectHome = () => {
    return (
        <div className='projectHome'>
            <div className='header'>
            <img src={pink} width = '50px'/>
            <span className='title'>이젠 답을 찾는 Q&A</span>
            </div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<ProjectList/>}/>
                    <Route path='/list' element={<ProjectList/>}/>
                    <Route path="/detail/:id" element={<ProjectDetail/>} />
                    <Route path='/register' element={<ProjectRegister/>}/>
                    <Route path='/modify/:id' element={<ProjectModify/>}/>
                    <Route path='/answer/:id' element={<ProjectAnswer/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default ProjectHome;