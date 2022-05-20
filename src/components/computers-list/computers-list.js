import ComputerListItem from "../computers-list-item/computers-list-item";
import JobTemplateList from '../job-template-list/job-template-list';

const ComputerList = ({data, jobTemplateList}) => {
  const elements = data.map(item => {
    const {id, ...itemProps} = item

    return(
      <ComputerListItem
        key = {id}
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