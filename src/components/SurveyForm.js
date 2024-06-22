import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/SurveyForm.css';

const SurveyForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        surveyTopic: '',
        favoriteLanguage: '',
        yearsOfExperience: '',
        exerciseFrequency: '',
        dietPreference: '',
        highestQualification: '',
        fieldOfStudy: '',
        feedback: ''
    });

    const [additionalQuestions, setAdditionalQuestions] = useState([]);
    const [errors, setErrors] = useState({});
    const [submissionSummary, setSubmissionSummary] = useState(null);

    useEffect(() => {
        if (formData.surveyTopic) {
            fetchAdditionalQuestions(formData.surveyTopic);
        }
    }, [formData.surveyTopic]);

    const fetchAdditionalQuestions = async (topic) => {
        try {
            const response = await axios.get(`https://simple-books-api.glitch.me/books`);
            setAdditionalQuestions(response.data.questions);
        } catch (error) {
            console.error('Error fetching additional questions:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validate = () => {
        const errors = {};
        if (!formData.fullName) errors.fullName = 'Full Name is required';
        if (!formData.email) errors.email = 'Email is required';
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
        if (!formData.surveyTopic) errors.surveyTopic = 'Survey Topic is required';
        if (formData.surveyTopic === 'Technology') {
            if (!formData.favoriteLanguage) errors.favoriteLanguage = 'Favorite Programming Language is required';
            if (!formData.yearsOfExperience || formData.yearsOfExperience <= 0) {
                errors.yearsOfExperience = 'Years of Experience must be greater than 0';
            }
        }
        if (formData.surveyTopic === 'Health') {
            if (!formData.exerciseFrequency) errors.exerciseFrequency = 'Exercise Frequency is required';
            if (!formData.dietPreference) errors.dietPreference = 'Diet Preference is required';
        }
        if (formData.surveyTopic === 'Education') {
            if (!formData.highestQualification) errors.highestQualification = 'Highest Qualification is required';
            if (!formData.fieldOfStudy) errors.fieldOfStudy = 'Field of Study is required';
        }
        if (!formData.feedback || formData.feedback.length < 50) {
            errors.feedback = 'Feedback must be at least 50 characters';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            await fetchAdditionalQuestions(formData.surveyTopic);
            setSubmissionSummary(formData);
        }
    };

    return (
        <div className="form-container">
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name:</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
                    {errors.fullName && <p className="error">{errors.fullName}</p>}
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label>Survey Topic:</label>
                    <select name="surveyTopic" value={formData.surveyTopic} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Technology">Technology</option>
                        <option value="Health">Health</option>
                        <option value="Education">Education</option>
                    </select>
                    {errors.surveyTopic && <p className="error">{errors.surveyTopic}</p>}
                </div>

                {formData.surveyTopic === 'Technology' && (
                    <>
                        <div className="form-group">
                            <label>Favorite Programming Language:</label>
                            <select name="favoriteLanguage" value={formData.favoriteLanguage} onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="JavaScript">JavaScript</option>
                                <option value="Python">Python</option>
                                <option value="Java">Java</option>
                                <option value="C#">C#</option>
                            </select>
                            {errors.favoriteLanguage && <p className="error">{errors.favoriteLanguage}</p>}
                        </div>
                        <div className="form-group">
                            <label>Years of Experience:</label>
                            <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} />
                            {errors.yearsOfExperience && <p className="error">{errors.yearsOfExperience}</p>}
                        </div>
                    </>
                )}

                {formData.surveyTopic === 'Health' && (
                    <>
                        <div className="form-group">
                            <label>Exercise Frequency:</label>
                            <select name="exerciseFrequency" value={formData.exerciseFrequency} onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Rarely">Rarely</option>
                            </select>
                            {errors.exerciseFrequency && <p className="error">{errors.exerciseFrequency}</p>}
                        </div>
                        <div className="form-group">
                            <label>Diet Preference:</label>
                            <select name="dietPreference" value={formData.dietPreference} onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Vegan">Vegan</option>
                                <option value="Non-Vegetarian">Non-Vegetarian</option>
                            </select>
                            {errors.dietPreference && <p className="error">{errors.dietPreference}</p>}
                        </div>
                    </>
                )}

                {formData.surveyTopic === 'Education' && (
                    <>
                        <div className="form-group">
                            <label>Highest Qualification:</label>
                            <select name="highestQualification" value={formData.highestQualification} onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="High School">High School</option>
                                <option value="Bachelor's">Bachelor's</option>
                                <option value="Master's">Master's</option>
                                <option value="PhD">PhD</option>
                            </select>
                            {errors.highestQualification && <p className="error">{errors.highestQualification}</p>}
                        </div>
                        <div className="form-group">
                            <label>Field of Study:</label>
                            <input type="text" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} />
                            {errors.fieldOfStudy && <p className="error">{errors.fieldOfStudy}</p>}
                        </div>
                    </>
                )}

                <div className="form-group">
                    <label>Feedback:</label>
                    <textarea name="feedback" value={formData.feedback} onChange={handleChange} />
                    {errors.feedback && <p className="error">{errors.feedback}</p>}
                </div>

                <button type="submit">Submit</button>
            </form>

            {submissionSummary && (
                <div className="summary">
                    <h2>Submission Summary</h2>
                    <p><strong>Full Name:</strong> {submissionSummary.fullName}</p>
                    <p><strong>Email:</strong> {submissionSummary.email}</p>
                    <p><strong>Survey Topic:</strong> {submissionSummary.surveyTopic}</p>
                    {submissionSummary.surveyTopic === 'Technology' && (
                        <>
                            <p><strong>Favorite Programming Language:</strong> {submissionSummary.favoriteLanguage}</p>
                            <p><strong>Years of Experience:</strong> {submissionSummary.yearsOfExperience}</p>
                        </>
                    )}
                    {submissionSummary.surveyTopic === 'Health' && (
                        <>
                            <p><strong>Exercise Frequency:</strong> {submissionSummary.exerciseFrequency}</p>
                            <p><strong>Diet Preference:</strong> {submissionSummary.dietPreference}</p>
                        </>
                    )}
                    {submissionSummary.surveyTopic === 'Education' && (
                        <>
                            <p><strong>Highest Qualification:</strong> {submissionSummary.highestQualification}</p>
                            <p><strong>Field of Study:</strong> {submissionSummary.fieldOfStudy}</p>
                        </>
                    )}
                    <p><strong>Feedback:</strong> {submissionSummary.feedback}</p>

                    {additionalQuestions.length > 0 && (
                        <div>
                            <h3>Additional Questions</h3>
                            {additionalQuestions.map((question, index) => (
                                <p key={index}>{question}</p>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SurveyForm;
