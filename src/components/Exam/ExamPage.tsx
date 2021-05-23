import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import styles from "../Exam/ExamPage.module.scss";

export interface ExamPageProps
{
    id: string;
}

const ExamPage: React.FunctionComponent<ExamPageProps> = (props: ExamPageProps) =>
{
    const [exam, setExam] = React.useState([]);
    const [score, setScore] = React.useState<number>(0);

    useEffect(() => {
        axios.get('http://localhost:8080/api/exams/' + props.id, {
            headers: {
                accept: 'application/json',
            }
        }).then(res => {
            setExam(res.data);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        const answerIdList = [];
        for (const answerId of data.keys()) {
            answerIdList.push(answerId);
        }

        axios.post('http://localhost:8080/api/assessments', {
            exam: "/api/exams/" + exam.id,
            answerIdList: answerIdList
        }, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            }
        })
            .then(function (response) {
                setScore(response.data.score);
                window.scrollTo(0, 0);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return <main
        className={styles['home-page']}
    >
        <h1>{ exam.name }</h1>

        <div>Score: { score }</div>

        <form onSubmit={handleSubmit}>
            {
                Object.keys(exam).map((item, i) => (
                    Object.keys(exam.questions).map((item, i) => (
                        <div>
                            <p>
                                <span>{exam.questions[item].id} </span>
                                <span>{exam.questions[item].question}</span>
                            </p>
                            <span>
                                {
                                    Object.keys(exam.questions[item].answers).map((answerItem, i) => (
                                        <div className="custom-control custom-checkbox">
                                            <input  type="checkbox"
                                                    className="custom-control-input"
                                                    id={exam.questions[item].answers[answerItem].id}
                                                    name={exam.questions[item].answers[answerItem].id}
                                            />
                                            <label className="custom-control-label"
                                                   htmlFor="defaultUnchecked"
                                            >{exam.questions[item].answers[answerItem].answer}</label>
                                        </div>
                                    ))
                                }
                            </span>
                        </div>
                    ))
                ))
            }
            <input type="submit" value="Submit" />
        </form>

    </main>
}

export default ExamPage;
