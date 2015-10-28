var inquirer = require('inquirer');
var correct_char_values=[];
var correct_char_locations=[];
var incorrect=0,correct=0,i=0,flag_stop=0;
var quizzes = {
  easy: {
    data_game: ['air', 'axe', 'bat','cat','dog','bet','fat']
  },
  hard: {
    data_game: ['aloes','amies','chaos','chaws','chasm','chits']
  }
};

module.exports.run = function(difficulty) {
  var quiz = new Quiz(quizzes[difficulty])
  quiz.init();
}

function Quiz(quiz) {
  this.data_game = quiz.data_game;
};

Quiz.prototype.init = function() {
  //var self=this;
  var v1=Math.floor(Math.random() * 5) + 0;
  this.answer_real=this.data_game[v1];

  this.displayQuiz();
}

Quiz.prototype.displayQuiz = function() {
  var self = this;

  inquirer.prompt([{
    type: 'input',
    name: 'player_entered_char',
    message: 'Enter character',
  }], function(input) {
    
    if( incorrect<5)
      {    
          if(correct_char_locations.length!=self.answer_real.length && flag_stop==0)
          {
                 self.isRight(input.player_entered_char);
                
          }else{
            this.playAgain();
          }
      }
      });
}


Quiz.prototype.isRight = function(player_entered_char) 

 {
  var self=this;

  var solution=self.answer_real;inner_flag=1;

  for(var j=0;j<solution.length;j++)
  {
      if(player_entered_char==solution[j] && incorrect<4 && correct<self.answer_real.length )
      {
          correct_char_locations.push(j);
          correct_char_values[j]=player_entered_char;
 
          console.log('Correct Entered Values:'+ correct_char_values);
          inner_flag=2;correct=correct+1;i=i+1;

          if(correct_char_locations.length==self.answer_real.length)
            flag_stop=1;
          if(j+1!=solution.length)
          {
            this.displayQuiz();
          }  
      }
  }

  if(inner_flag!=2)
  { 
    console.log('incorrect character entered...');
    incorrect=incorrect+1;
    
    i=i+1;
    if(incorrect!=5)
      this.displayQuiz();
    
  }

  if((correct_char_locations.length==self.answer_real.length)|| incorrect==5)
    {
      self.playAgain();
    }
 }

Quiz.prototype.playAgain = function() 
{
  var self = this;
  console.log('Game is Finished....');
  inquirer.prompt([{
    type: 'confirm',
    name: 'answer',
    message: '\nDo you want to play again?',
  }], function(input) {

    if (input.answer) {
      var quiz = new Quiz({data_game: self.data_game});
      incorrect=0,correct=0,i=0,flag_stop=0;
      while(correct_char_values.length > 0) 
        {
          correct_char_values.pop();
        }
      while(correct_char_locations.length > 0) 
        {
          correct_char_locations.pop();
        }
      quiz.init();
    } else {
      console.log('Goodbye');
    }

  });
}