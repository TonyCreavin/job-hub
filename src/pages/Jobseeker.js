const Jobseeker = () => {
  return (
    <div className="container">
      <br />
      <br /> <br />
      <div className="jobseeker">
        <div
          style={{ width: '600px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          <h1>Chercheur</h1>
          <br /> <b></b>
          <form
            className="row d-flex justify-content-around"
            style={{}}
            action=""
          >
            <div className="col-6">
              <input
                type="text"
                className="form form-control"
                placeholder="nom"
              />{' '}
              <br />
              <input
                type="text"
                className="form form-control"
                placeholder="prenom"
              />{' '}
              <br />
              <input
                type="email"
                className="form form-control"
                placeholder="email"
              />{' '}
              <br />
              <input
                type="number"
                className="form form-control"
                placeholder="telephone"
              />{' '}
              <br />
              <input
                type="text"
                className="form form-control"
                placeholder="nom de l'entréprise"
              />
            </div>
            <div className="col-6">
              <input
                type="text"
                className="form form-control"
                placeholder="site web"
              />{' '}
              <br />
              <input
                type="email"
                className="form form-control"
                placeholder="ville"
              />{' '}
              <br />
              <input
                type="number"
                className="form form-control"
                placeholder="code postal"
              />{' '}
              <br />
              <input
                type="number"
                placeholder="paie"
                className="form form-control"
              />{' '}
              <br />
              <button
                type="submit"
                className="btn btn-primary btn-block"
                style={{ width: '100%' }}
              >
                envoyer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Jobseeker;
