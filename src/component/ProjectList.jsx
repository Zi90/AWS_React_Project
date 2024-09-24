import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Paging from './ProjectPaging';

const ProjectList = () => {

    const [ projectList, setProjectList ] = useState([]);

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

    const onClick = async (b) => {
        try{
            const res = await axios.post(`/views/${b.id}`);
            if(b.lock_type === '비공개'){
                window.location.href = `/pass/${b.id}`;
            }else{
                window.location.href = `/detail/${b.id}`;
                console.log(res);
            }
        }catch(error){
            console.log(error);
        }
    };

    // Paging
    const [ currentPage, setCurrentPage ] = useState(1);
    const itemPerPage = 10;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    // 한페이지 목록 슬라이스
    //현재 페이지의 마지막 문의의 인덱스
    const indexOfLastInquiry = currentPage * itemPerPage;
    //현재 페이지의 첫 번째 문의의 인덱스
    const indexOfFirstInquiry = indexOfLastInquiry - itemPerPage;
    //현재 페이지에 대한 문의만 포함하는 새 배열을 만드는 방법
    const currentInquiries = projectList.slice(indexOfFirstInquiry, indexOfLastInquiry);

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
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentInquiries.map(b => (
                            <tr key={b.id}>
                                <td className='center'>{b.id}</td>
                                <td onClick={() => onClick(b)} className='cursor'>{b.title}<span className='lock'>({b.lock_type})</span></td>
                                <td>{b.writer}</td>
                                <td>{b.reg_date.substring(0, b.reg_date.indexOf("T"))}</td>
                                <td>{b.views}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Paging
                    currentPage={currentPage}
                    itemCount={projectList.length}
                    itemPerPage={itemPerPage}
                    onPageChange={handlePageChange}
                />
                    <Link to={`/register`}><button className='textButton'>글쓰기</button></Link>
            </div>
        );
    }
};

export default ProjectList;