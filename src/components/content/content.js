import './content.css'
import ComputerList from '../computers-list/computers-list';

const Content = ({computerList,ipAddrList,jobTemplateList}) => {
  return (
    <div className='content'>
      <ComputerList
        computerList={computerList}
        ipAddrList={ipAddrList}
        jobTemplateList={jobTemplateList}
      />
    </div>
    
  );
}

export default Content