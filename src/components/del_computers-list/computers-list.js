import ComputerListItem from "../computers-list-item/computers-list-item";
import JobTemplateList from '../job-template-list/job-template-list';

const ComputerList = ({computerList, computerItemToggleCheck, jobTemplateList}) => {

  const elements = computerList.map(item => {
    console.log('comp')
    const {...itemProps} = item
    
    return(
      <ComputerListItem
        key = {item.id}
        {...itemProps}
        computerItemToggleCheck = {computerItemToggleCheck}
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