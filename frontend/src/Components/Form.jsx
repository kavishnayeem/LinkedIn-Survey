import React from 'react';
import './Form.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responses: {
        clarity: 1,
        professionalism: 1,
        completeness: 1,
        skills: 1,
        overall: 1
      },
      isSubmitted: false // New state to track submission
    };
    
    this.questions = [
      { id: 'clarity', label: 'Profile clarity and communication effectiveness' },
      { id: 'professionalism', label: 'Professional presentation and tone' },
      { id: 'completeness', label: 'Profile completeness and detail' },
      { id: 'skills', label: 'Skills and certifications relevance' },
      { id: 'overall', label: 'Overall profile strength' }
    ];

    this.scaleLabels = {
      1: 'Strongly Disagree',
      2: 'Disagree',
      3: 'Somewhat Disagree',
      4: 'Neutral',
      5: 'Somewhat Agree',
      6: 'Agree',
      7: 'Strongly Agree'
    };
  }

  handleSliderChange = (questionId, value) => {
    this.setState(prevState => ({
      responses: {
        ...prevState.responses,
        [questionId]: parseInt(value)
      }
    }));
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.props.isSubmitted) return;

    try {
      const response = await fetch('http://localhost:5000/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: '01',
          profileId: this.props.profileData.id,
          responses: this.state.responses
        }),
      });

      if (!response.ok) throw new Error('Submission failed');

      this.resetForm();
      if (this.props.onSubmitSuccess) {
        this.props.onSubmitSuccess();
      }
      alert("Form submitted successfully!");
    } catch (error) {
      console.error('Submission error:', error);
      alert(error.message || 'Failed to submit. Please try again.');
    }
  };

  resetForm = () => {
    this.setState({
      responses: {
        clarity: 1,
        professionalism: 1,
        completeness: 1,
        skills: 1,
        overall: 1
      },
      isSubmitted: false // Reset the submission state
    });
  };

  renderQuestionRow = (question) => {
    const value = this.state.responses[question.id];
    
    return (
      <div key={question.id} className="question-row">
        <div className="question-header">
          <label className="question-label">{question.label}</label>
          <div className="value-indicator">
            <span className="numeric-value">{value}</span>
            <span className="text-value">{this.scaleLabels[value]}</span>
          </div>
        </div>
        <div className="slider-container">
          <input
            type="range"
            min="1"
            max="7"
            value={value}
            onChange={(e) => this.handleSliderChange(question.id, e.target.value)}
            className="professional-slider"
          />
          <div className="scale-markers">
            {[1, 2, 3, 4, 5, 6, 7].map((marker) => (
              <span key={marker} className="scale-marker">{marker}</span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="form-container">
        <h2 className="form-title">Professional Profile Assessment</h2>
        <p className="form-instruction">
          Rate the following aspects on a scale from 1 (Strongly Disagree) to 7 (Strongly Agree)
        </p>
        
        <form onSubmit={this.handleSubmit} className="evaluation-form">
          {this.questions.map(this.renderQuestionRow)}

          <div className="form-actions">
          <button 
              type="submit" 
              className="submit-button" 
              disabled={this.props.isSubmitted}
          >
          {this.props.isSubmitted ? 'Already Submitted' : 'Submit Evaluation'}
        </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;