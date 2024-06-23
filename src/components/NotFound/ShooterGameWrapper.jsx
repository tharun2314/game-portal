import Shootergame from "../Shootergame";
import QuestionModal from "../QuestionModal";
import React,{useState,useEffect} from 'react';
export default function ShooterGameWrapper()
{
    return(
        <>
        <Shootergame/>
        {/* {showQuiz &&<QuestionModal onClose={close} />} */}
        </>
    )

}