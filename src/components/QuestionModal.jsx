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

const QuestionModal = ({
  questionData = {
    id: 1,
    difficulty: "easy",
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
  },
  onClose,
  maxSecs = 30,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [remainingSecs, setRemainingSecs] = React.useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log("i am hereee bro")
    const timer = setInterval(() => {
      setRemainingSecs((prevSecs) =>
        prevSecs < maxSecs ? prevSecs + 1 : prevSecs
      );
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isSubmitting, maxSecs, onClose]);

  useEffect(() => {
    if (remainingSecs === maxSecs) {
      onClose();
    }
  }, [maxSecs, onClose, remainingSecs]);

  useEffect(() => {
    setProgress((remainingSecs / maxSecs) * 100);
  }, [maxSecs, remainingSecs]);

  const handleOptionChange = (event) => {
    setSelectedOption(parseInt(event.target.value));
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
        if(res?.data?.isCorrect==true){
          onClose(1)
        }
        else
        {
          onClose(0);
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
    <Dialog open onClose={onClose} fullWidth>
      <DialogTitle>{questionData.question}</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <RadioGroup value={selectedOption} onChange={handleOptionChange}>
            {questionData.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={index}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Box
          sx={{ position: "relative", display: "flex", alignItems: "center" }}
        >
          <CircularProgress variant="determinate" value={progress} />
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
            sx={{ marginLeft: "5px" }}
          >
            {`${Math.round(remainingSecs)} secs`}
          </Typography>
        </Box>
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
            disabled={isSubmitting || !selectedOption}
          >
            Submit
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionModal;
