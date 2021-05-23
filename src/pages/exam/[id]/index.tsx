import { useRouter } from 'next/router'
import ExamPage from "../../../components/Exam/ExamPage";

const Exam = () => {
    const router = useRouter()
    const { id } = router.query

    if(!id) {
        return <></>;
    }

    return (
        <ExamPage id={id} />
    )
}

export default Exam
