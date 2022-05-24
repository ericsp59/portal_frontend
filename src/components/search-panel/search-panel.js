import './search-panel.css'

const SearchPanel = (props) => {
  const {searchString, changeSearchStr} = props
  return (
    <div className="search-panel">
      <form className="navbar-form" role="search">
      <div className="input-group">
      <input
        type="text"
        autoComplete="off"
        className="form-control"
        placeholder="Search"
        name="search"
        id="search-input"
        value={searchString}
        onChange={(e) => changeSearchStr(e.target.value)}/>
    </div>
</form>
    </div>
  ); 
}

export default SearchPanel