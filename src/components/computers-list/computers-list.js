import ComputerListItem from "../computers-list-item/computers-list-item";
import JobTemplateList from '../job-template-list/job-template-list';

const ComputerList = ({computerList, ipAddrList, jobTemplateList}) => {
  
  const elements = computerList.map(item => {
    const {...itemProps} = item
    
    return(
      <ComputerListItem
        key = {item.id}
        {...itemProps}
      />
    );
  })

  return (
    <>
    <JobTemplateList jobTemplateList = {jobTemplateList}/>
    <ul>
      {elements}
    </ul>
    </>
  );
}

export default ComputerList