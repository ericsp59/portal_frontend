import './search-panel.css'

const SearchPanel = () => {
  return (
    <div className="search-panel">
      <form className="navbar-form" role="search">
  <div className="input-group">
    <input type="text" autoComplete="off" className="form-control" placeholder="Search" name="search" id="search-input"/>
        <span className="input-group-btn">
            <button className="btn" id="srchbtn" type="btn-default">
                <i className="fa fa-search" aria-hidden="true"></i>
            </button>
        </span>
    </div>
</form>
    </div>
  ); 
}

export default SearchPanel