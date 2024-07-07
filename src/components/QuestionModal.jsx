import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "../Axios";
import toast,{Toaster} from 'react-hot-toast'
import LinearProgress from '@mui/material/LinearProgress';

const QuestionModal = ({
  questionData={
    id: 29,
    difficulty: "easy",
    question: "What is the primary goal of the Requirement Analysis phase in SDLC?",
    options: [
      "To write code",
      "To gather user feedback",
      "To develop initial prototypes",
      "To gather and analyze requirements"
    ],
    answer: 3
  },
  onClose,
  maxSecs = 30,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [remainingSecs, setRemainingSecs] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSecs((prevSecs) =>
        prevSecs < maxSecs ? prevSecs + 1 : prevSecs
      );
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [maxSecs]);

  useEffect(() => {
    if (remainingSecs === maxSecs) {
      onClose();
    }
  }, [maxSecs, onClose, remainingSecs]);

  useEffect(() => {
    setProgress((remainingSecs / maxSecs) * 100);
  }, [maxSecs, remainingSecs]);

  const handleOptionChange = (event) => {
    setSelectedOption(parseInt(event.target.value, 10));
  };

  const handleSubmit = () => {
    if (selectedOption === null) {
      return;
    }

    setIsSubmitting(true);

    axios
      .post(process.env.REACT_APP_BASE_URL + "api/check-answer", {
        questionId: questionData.id,
        answerValue: selectedOption,
        difficulty: questionData.difficulty,
      })
      .then((res) => {
        if (res?.data?.isCorrect === true) {
          toast.success("Correct answer");
          setTimeout(()=>{
            onClose(1);
          },2000)
        } else {
          toast.error("Wrong answer")
          setTimeout(()=>{
            onClose(0);
          },2000)
        }
      })
      .catch((err) => {
        console.log(err);
        onClose(0);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <><Dialog open={true} onClose={onClose} fullWidth>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1,margin:0 }}>
        <LinearProgress style={{margin:0,height:7}}variant="determinate" value={progress} />
      </Box>
    </Box>
      <DialogTitle>{questionData.question}</DialogTitle>
      <DialogContent>
  
        <FormControl component="fieldset">
          <RadioGroup value={selectedOption} onChange={handleOptionChange}>
            {questionData.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={index}
                control={<Radio />}
                label={option} />
            ))}
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions
        style={{ display: "flex", justifyContent: "space-between" }}
      >
          
        <div style={{ display: "flex" }}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              marginRight: "10px",
            }}
          >
            Skip
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isSubmitting || selectedOption === null}
          >
            Submit
          </Button>
        </div>
      </DialogActions>
    </Dialog><Toaster /></>
  );
};

export default QuestionModal;
