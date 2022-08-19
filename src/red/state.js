let state = {
    glpiData: {
      glpiAuthConfig: {},
      selComputersInfoList: [],
      computerList: [],
      allComputerList: [],
      loadingComputerList: false,
      // selectedComputerItems:[],
      computerListTotalCount: 0,
      allComputerListTotalCount: 0,
    },
    // awxData: {
    //   jobTemplateList: []
    // },
    SemaphoreData: {
      jobTemplateList: [],
      keysList: []
    },
    search: {
      searchString: ''
    },
    djangoBackendData: {
      notes: []
    },
    app: {
      newTemplateName: '',
      selectedPlaybookFile: {},
      glpiSessionToken: '',
      semaphoreSessionToken: '12',
      selectedComputer: 1,
      glpiInventory: {},
      selectedComputerIds: [],
      selectedTemplatesIds: [],
      selectedKeysIds: [],
      loading: true,
      isError: false,
      loadMoreButtonIsDisabled: false,
      computersRangeFrom: 0,
      computersRangeTo: 40000,
      computersLoadCount: 10,
      baseDir: '/'
    }
  }

export default state  