import './content.css'
import ComputerList from '../computers-list/computers-list';

const Content = ({data,jobTemplateList}) => {
  return (
    <div className='content'>
      <ComputerList
        data={data}
        jobTemplateList={jobTemplateList}
      />
    </div>
    
  );
}

export default Content