var books = [
	{
		pid                : '0',
		moduleCode         : 'MNO3303',
		title              : 'Organization Theory and Design An International Perspective',
		edition            : '2nd Edition',
		authors            : 'Richard L. Daft, Jonathan Murphy, Hugh Willmott',
		conditionRank      : 10,
		conditionCheckList : 4,
		description        : "Description 1",
		price              : 35,
		sid                : "1",
		isSelected         : false,
		postTime           : "2015/03/05",
        isSold             : false
	}, 
	{
		pid                : '1',
		moduleCode         : 'GEM2900',
		title              : 'Everyday probability and Statistics',
		edition            : '2nd Edition',
		authors            : 'Michael M Woolfson',
		conditionRank      : 10,
		conditionCheckList : 4,
		description        : "Description 1",
		price              : 15,
		sid                : "1",
		isSelected         : true,
		postTime           : "2015/03/05",
        isSold             : true
	}, 
	{
		pid                : '2',
		moduleCode         : 'CS3241',
		title              : 'Thomas\' Calculus',
		edition            : '12th Edition',
		authors            : 'George B. Thomas, Maurice D. Weir, Joel R. Hass',
		conditionRank      : 9.5,
		conditionCheckList : 4,
		description        : "Description 1",
		price              : 25,
		sid                : "1",
		isSelected         : false,
		postTime           : "2015/03/05",
        isSold             : false
	}, 
	{
		pid                : '3',
		moduleCode         : 'ST1131',
		title              : 'The Art And Science of Learing from Data',
		edition            : '3rd Edition',
		authors            : 'Agresti Franklin',
		conditionRank      : 9.5,
		conditionCheckList : 4,
		description        : "Description 1",
		price              : 20,
		sid                : "1",
		isSelected         : true,
		postTime           : "2015/03/05",
        isSold             : false
	}, 
	{
		pid                : '4',
		moduleCode         : 'MA2108',
		title              : 'Introduction to real analysis',
		edition            : '3rd Edition',
		authors            : 'Robert G. Bartle, Donald R. Sherbert',
		conditionRank      : 10,
		conditionCheckList : 4,
		description        : "Description 1",
		price              : 28,
		sid                : "1",
		isSelected         : false,
		postTime           : "2015/03/04",
        isSold             : false
	}, 
	{
		pid                : '5',
		moduleCode         : 'CS2105',
		title              : 'Computer Networking',
		edition            : 'edition 1',
		authors            : 'author 1',
		conditionRank      : 9,
		conditionCheckList : 4,
		description        : "Description 1",
		price              : 20,
		sid                : "1",
		isSelected         : true,
		postTime           : "2015/03/03",
        isSold             : false
	}, 
	{
		pid                : '6',
		moduleCode         : 'LSM1301',
		title              : 'Biology',
		edition            : 'International Ed (7th Edition)',
		authors            : 'Neil A. Campbell & Jane B. Reece',
		conditionRank      : 9,
		conditionCheckList : 4,
		description        : "Description 1",
		price              : 25,
		sid                : "0",
		isSelected         : true,
		postTime           : "2015/03/03",
        isSold             : false
	}, 
	{
		pid                : '7',
		moduleCode         : 'MA1100',
		title              : 'Mathematical Proofs - A Transition to Advanced Mathematics',
		edition            : '2nd Edition',
		authors            : 'Gary Chartrand, Albert D. Polimeni, Ping Zhang',
		conditionRank      : 8,
		conditionCheckList : 4,
		description        : "Description 1",
		price              : 12,
		sid                : "0",
		isSelected         : false,
		postTime           : "2015/03/03",
        isSold             : false
	}, 
	{
		pid                : '8',
		moduleCode         : 'CS2102',
		title              : 'Database Management Systems',
		edition            : '2nd Edition',
		authors            : 'Raghu Ramakrishnan and Johannes Gehrke',
		conditionRank      : 10,
		conditionCheckList : 4,
		description        : "Description 1",
		price              : 20,
		sid                : "0",
		isSelected         : true,
		postTime           : "2015/03/03",
        isSold             : false
	}, 
	{
		pid                : '9',
		moduleCode         : 'CS2100',
		title              : 'Digital Logic Design',
		edition            : '2nd Edition',
		authors            : 'Tan Tuck Choy, Aaron',
		conditionRank      : 10,
		conditionCheckList : 4,
		description        : "Description 1",
		price              : 10,
		sid                : "0",
		isSelected         : true,
		postTime           : "2015/03/04",
        isSold             : false
	}, 
	{
		pid                : '10',
		moduleCode         : 'IS1103',
		title              : 'Ethics for the Information Age',
		edition            : '4th Edition',
		authors            : 'Michael J. Quinn',
		conditionRank      : 8,
		conditionCheckList : 4,
		description        : "Description 1",
		price              : 15,
		sid                : "0",
		isSelected         : false,
		postTime           : "2015/03/04",
        isSold             : false
	}, 
	{
		pid                : '11',
		moduleCode         : 'IS2103',
		title              : 'Enterprise JavaBeans for Students',
		edition            : 'edition 1',
		authors            : 'Danny Poo',
		conditionRank      : 8,
		conditionCheckList : 4,
		description        : "Description 1",
		price              : 15,
		sid                : "0",
		isSelected         : true,
		postTime           : "2015/03/04",
        isSold             : true
	}
];

var favorites = [
    {
        uid: '0',
        pid: '1'
    },
    {
        uid: '0',
        pid: '4'
    },
    {
        uid: '0',
        pid: '7'
    }
];

var users = [
	{
		id        : '0',
		name      : 'Sun Jixuan',
		handphone : '98264921',
		email     : 'jixuan@gmail.com',
		whatsapp  : 'NUS Eusoff block B room 104',
	},
	{
		id        : '1',
		name      : 'Sun Jiba',
		handphone : '98264922',
		email     : 'jixuan@gmail.com',
		whatsapp  : 'NUS Eusoff block B room 104',
	},
];

var currentUserID = '0';
var currentUser;
var currentBook;