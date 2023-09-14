const EditSurveyPage = () => {
  const handleClose = (event) => {
    event.preventDefault();
    alert('Kysely päätetty');
  };

  return (
    <div>
      <h1>Edit Survey Page</h1>
      <button onClick={handleClose}>Päätä kysely</button>
    </div>
  );
};

export default EditSurveyPage;
