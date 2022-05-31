import './content.css'
import ComputerList from '../computers-list/computers-list';

const Content = ({computerList,computerItemToggleCheck,ipAddrList,jobTemplateList,loadMore, loadMoreButtonIsDisabled}) => {
  return (
    <div className='content'>
      <button 
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

export default Content