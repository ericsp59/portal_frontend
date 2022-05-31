import './automatization-page.css'
import ComputerList from '../../computers-list/computers-list';

const AutomatizationPage = ({computerList,computerItemToggleCheck,ipAddrList,jobTemplateList,loadMore, loadMoreButtonIsDisabled}) => {
  return (
    <div className='automatization-page'>
      <button 
        className='mb-3 p-2 btn-primary btn-block shadow rounded'
        disabled={loadMoreButtonIsDisabled}
        onClick={() => loadMore()}
      >Загрузить еще</button>
      <ComputerList
        computerList={computerList}
        ipAddrList={ipAddrList}
        jobTemplateList={jobTemplateList}
        computerItemToggleCheck = {computerItemToggleCheck}
      />
    </div>
    
  );
}

export default AutomatizationPage