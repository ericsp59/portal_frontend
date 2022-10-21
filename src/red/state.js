let state = {
    glpiData: {
      glpiAuthConfig: {},
      selComputersInfoList: [],
      selPhonesInfoList: [],
      selNetDevInfoList: [],
      selDeviceInfoList: [],
      computerList: [],
      allPhonesList: [],
      allComputerList: [],
      allNetworkDevList: [],
      loadingComputerList: false,
      // selectedComputerItems:[],
      computerListTotalCount: 0,
      allComputerListTotalCount: 0,
      allPhonesListTotalCount: 0,
      allNetworkDevListTotalCount: 0,
    },
    // awxData: {
    //   jobTemplateList: []
    // },
    SemaphoreData: {
      semaphoreAuthConfig: [],
      jobTemplateList: [],
      keysList: [],
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
      selectedComputer: 0,
      selectedPhone: 0,
      selectedNteworkDev: 0,
      glpiInventory: {},
      selectedComputerIds: [],
      selectedPhoneIds: [],
      selectedNetDevIds: [],
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