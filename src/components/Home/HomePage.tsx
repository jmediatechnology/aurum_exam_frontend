import styles from './HomePage.module.scss';
import * as React from 'react';
import axios from 'axios';
import {useEffect, useState} from "react";

export interface HomePageProps
{
    className?: string;
}

const HomePage: React.FunctionComponent<HomePageProps> = (
    props: HomePageProps
) =>
{
    const [exams, setExams] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/exams?page=1', {
            headers: {
                accept: 'application/json',
            }
        })
            .then(res => {
                setExams(res.data);
            })
    }, []);

    return <main
        className={styles['home-page']}
    >
        <h1>Aurum Exam</h1>
        <table>
            <thead>
            <tr><th>Exams</th></tr>
            </thead>
            <tbody>
            {
                Object.keys(exams).map((item, i) => (
                    <tr key={exams[item].id}>
                        <td><a href={"/exam/" + exams[item].id}>{exams[item].name}</a></td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    </main>
}

export default HomePage;
