var MathWorld = new function() 
{
	// classes
	var _Screen_Parameters;
	var _Camera_Settings;
	var _Cube_Parameters;
	var _Symbol;
	var _Math_Element;
	var _Math_3D_Object;
	var _MathML_Tag;
	var _Parser;
	var _Math_Lesson;
	//Global MathWorld Objects
		//Tables
	var allSymbolsTable;
	var all3DObjectsTable;
	var MathMLTagsTable;
	var mathFormulaScenes;
	var mathFormulaNames;
	var mathLessons;
	var mathSections;
		// Loaders & Functions
	var ColladaLoader;
		// Funcs
	var load3DObjectBySymbol;
	var load3DColladaScenes;
	var objMaterialProperty;
	var getSizeOfObject;
	var Starter;

	//MainObjects
	var MainScene;
	var MainCamera;
	var MainContainer;
	var MainRanderer;
	var MainControls;
	var MainStats;
	var MainCameraSettings;
	var MainScreenParameters;


	var World;



	this.ColladaLoader = new THREE.ColladaLoader();



// FUNCS DEFINITIONS
	
	this.objMaterialProperty = function(parameters_json)
	{
		if (parameters_json)
		{
			if (parameters_json.value){
				parameters_json.obj.material[parameters_json.property].set(parameters_json.value);
			} else
			{
				return parameters_json.obj.material[parameters_json.property].getHexString();
			}
		}

	}

	this.getSizeOfObject = function(parameters_json)
	{
		if (parameters_json)
		{
			parameters_json.geometry.computeBoundingBox();
			var ret = new Object();
			ret.x = parameters_json.geometry.boundingBox.max.x - parameters_json.geometry.boundingBox.min.x;
			ret.y = parameters_json.geometry.boundingBox.max.y - parameters_json.geometry.boundingBox.min.y;
			ret.z = parameters_json.geometry.boundingBox.max.z - parameters_json.geometry.boundingBox.min.z;
			return ret;
		}
	}

	function load3DObjectBySymbol(symbol, loader, file_str)
	{
	    return new Promise(
		    function(resolve) 
		    {
		        loader.load(
		            file_str,
		            function(collada) 
		            {
		            	var ret = new Object();
		            	ret.obj = collada.scene.getChildByName("_"+symbol.htmlName.slice(1,-1)+"_", true);
		                ret.symbol = symbol;
		                resolve(ret);//// ДОРАБОТАТЬ ВСЕ ЭТО!!!
		            }
		        );
		    }
		);
	}

	function load3DColladaScene(loader, file_str)
	{
	    return new Promise(
		    function(resolve) 
		    {
		        loader.load(
		            file_str,
		            function(collada) 
		            {
		                resolve(collada.scene);//// ДОРАБОТАТЬ ВСЕ ЭТО!!!
		            }
		        );
		    }
		);
	}


//	function load3DColladaScenes(name, loader)


// CLASSES DEFINITIONS

	this._Screen_Parameters = function()
	{
		var Height;
		var Width;

		this.Height = parseInt(window.innerHeight);
		this.Width = parseInt(window.innerWidth);

	};

	this._Camera_Settings = function(parameters_json) 
	{
		var View_Angle, Aspect_Ratio, Near, Far;
		var parameters = new Object();

		if (parameters_json)
			temp = JSON.stringify(parameters_json);
			this.parameters = JSON.parse(temp);
		
		if (typeof parameters.view_angle !== "undefined")
			this.View_Angle = parameters.view_angle;
		else
			this.View_Angle = 45;

		if (typeof parameters.aspect_ratio !== "undefined")
			this.Aspect_Ratio = parameters.view_angle; // угол обзора
		else
			this.Aspect_Ratio = parseInt(window.innerWidth) / parseInt(window.innerHeight);

		if (typeof parameters.near !== "undefined")
			this.Near = parameters.near;
		else
			this.Near = 1;

		if (typeof parameters.far !== "undefined")
			this.Far = parameters.far;
		else
			this.Far = 10000;
	};
	
	this._Cube_Parameters = function()
	{
		var Width, Height, Depth, Separator;
		this.Width = this.Height = this.Depth = 20;
		this.Separator = 10;
	};

	this._Math_Element = function()
	{ // следующие элементы представляются не в кодах, а как есть
		var Childs; //массив с вложенными конструкциями: если есть, определен, имеет потомков, если нет = null
		var Type; // operation = o | identificator = i | number = n | container = c
		var HTMLSymbol; // HTML значение содержимого
		var Mesh; // 3D объект, который будет в сцене
		var Name;
		var MathMLTag;
	};

	this._MathML_Tag = function() 
	{
		var Name; //tagName
		var Type; //container | opration | identificator | number
		var OpenCloseSymbols; // true  | false

	}

	this._Symbol = function (args_json){
		var htmlCode;
		var htmlName;
		var keySym;
		var loadName;
		var javascriptUnicode;
		var description;
		var latex;

		this.htmlCode = null;
		this.htmlName = null;
		this.javascriptUnicode = null;
		this.description = null;
		this.latex = null;
		this.keySym = null;
		this.loadName = null;

		var parameters = new Object();

		if (args_json)
		{
			temp = JSON.stringify(args_json);
			this.parameters = JSON.parse(temp);

			if (typeof this.parameters.latex !== "undefined")
				this.latex = this.parameters.latex;
			
			if (typeof this.parameters.html_code !== "undefined")
				this.htmlCode = this.parameters.html_code;

			if (typeof this.parameters.html_name !== "undefined")
				this.htmlName = this.parameters.html_name;

			if (typeof this.parameters.javascript_unicode !== "undefined")
				this.javascriptUnicode = this.parameters.javascript_unicode;

			if (typeof this.parameters.description !== "undefined")
				this.description = this.parameters.description;

			if (typeof this.parameters.key_sym !== "undefined")
				this.keySym = this.parameters.key_sym;

			if (typeof this.parameters.load_name !== "undefined")
				this.loadName = this.parameters.load_name;

		}
	};

	this.Parser = function() {
			function parseMathMLto3D(MathMLCode) {
				// получаем ноду со входом в код = тэг <math>
				var mathMLHeadNode = MathMLCode.getElementsByTagName("math")[0];
				window.alert(mathMLHeadNode);
			}
	};

	this._Math_Lesson = function() 
	{
		var Scene; // сцена, в которой все будет отображаться
		var Name; // имя урока
		var Meshes; // объекты
		var Func; //функция, которая будет выполняться в уроке
	}


// MATHWORLD OBJECTS initialisations


	this.allSymbolsTable = new Array();

	this.allSymbolsTable.push(new this._Symbol({"latex":"\\times", "html_name":"&times;", "html_code":"&#215;", "description":"умножение"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\div", "key_sym" : "/", "html_name":"&divide;", "html_code":"&#247;", "description":"деление"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\lt", "key_sym" : "<","html_name":"&lt;", "html_code":"&#60;", "description":"меньше"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\gt", "key_sym" : ">", "html_name":"&gt;", "html_code":"&#62;", "description":"больше"}));
	this.allSymbolsTable.push(new this._Symbol({"html_name":"&fnof;", "html_code":"&#402;", "description":"функция"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\plus", "key_sym": "+", "html_name":"&plus;", "html_code":"&#43;", "description":"плюс"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\minus", "key_sym" : "-", "html_name":"&minus;", "html_code":"&#45;", "description":"минус"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\minus", "key_sym" : "-", "html_name":"&minus;", "html_code":"&#8722;", "description":"минус"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\ast", "key_sym" : "*", "html_name":"&lowast;", "html_code":"&#8727;", "description":"умножение|сопряжение"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\sqrt{},\\sqrt[]{}", "html_name":"&radic;", "html_code":"&#8730;", "description":"корень"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\propto", "html_name":"&prop;", "html_code":"&#8733;", "description":"пропорциональность"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\infty", "html_name":"&infin;", "html_code":"&#8734;", "description":"бесконечность"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\angle", "html_name":"&ang;", "html_code":"&#8736;", "description":"угол"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\wedge","key_sym": "&", "html_name":"&and;", "html_code":"&#8743;", "description":"и"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\vee", "key_sym": "|", "html_name":"&or;", "html_code":"&#8744;", "description":"или"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\cap", "html_name":"&cap;", "html_code":"&#8745;", "description":"пересечение"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\cup", "html_name":"&cup;", "html_code":"&#8746;", "description":"объединение"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\int", "html_name":"&int;", "html_code":"&#8747;", "description":"интеграл"}));
	this.allSymbolsTable.push(new this._Symbol({"html_name":"&there4;", "html_code":"&#8756;", "description":"поэтому"}));
	this.allSymbolsTable.push(new this._Symbol({"key_sym" : "=", "html_name" : "&equal;", "description":"равно"}));
	this.allSymbolsTable.push(new this._Symbol({"key_sym" : "(", "html_name" : "&lobrkt;", "description":"скобка"}));
	this.allSymbolsTable.push(new this._Symbol({"key_sym" : ")", "html_name" : "&robrkt;", "description":"скобка"}));
	this.allSymbolsTable.push(new this._Symbol({"key_sym" : "{", "html_name" : "{", "description":"фигурная скобка"}));
	this.allSymbolsTable.push(new this._Symbol({"key_sym" : "}", "html_name" : "}", "description":"фигурная скобка"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\sim", "key_sym" : "~", "html_name":"&sim;", "html_code":"&#8764;", "description":"подобно"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\cong", "html_name":"&cong;", "html_code":"&#8773;", "description":"сравнимо"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\approx", "html_name":"&asymp;", "html_code":"&#8776;", "description":"приблизительно равно"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\neq", "html_name":"&ne;", "html_code":"&#8800;", "description":"не равно"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\equiv", "html_name":"&equiv;", "html_code":"&#8801;", "description":"идентично"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\le", "html_name":"&le;", "html_code":"&#8804;", "description":"меньше или равно"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\ge", "html_name":"&ge;", "html_code":"&#8805;", "description":"больше или равно"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\subset", "html_name":"&sub;", "html_code":"&#8834;", "description":"подмножество"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\supset", "html_name":"&sup;", "html_code":"&#8835;", "description":"надмножестов"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"", "html_name":"&nsub;", "html_code":"&#8836;", "description":"не подмножество"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\subseteq", "html_name":"&sube;", "html_code":"&#8838;", "description":"подмножество"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\supseteq", "html_name":"&supe;", "html_code":"&#8839;", "description":"надмножество"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\oplus", "html_name":"&oplus;", "html_code":"&#8853;", "description":"прямая сумма"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\otimes", "html_name":"&otimes;", "html_code":"&#8855;", "description":"тензерное произведение"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\perp", "html_name":"&perp;", "html_code":"&#8869;", "description":"перпендикуляр"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\cdot","key_sym": ".", "html_name":"&sdot;", "html_code":"&#8836;", "description":"оператор точка"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\pm", "html_name":"&plusmn;", "html_code":"&#177;", "description":"плюс|минус"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\forall", "html_name":"&forall;", "html_code":"&#8704;", "description":"для каждого"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\partial", "html_name":"&part;", "html_code":"&#8706;", "description":"часть"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\exists", "html_name":"&exist;", "html_code":"&#8707;", "description":"существует"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\emptyset", "html_name":"&empty;", "html_code":"&#8709;", "description":"пустой"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\nabla", "html_name":"&nabla;", "html_code":"&#8711;", "description":"оператор Гамильтона (набла)"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\isin", "html_name":"&isin;", "html_code":"&#8712;", "description":"принадлежит к множеству"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"", "html_name":"&notin;", "html_code":"&#8713;", "description":"не принадлежит к множеству"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\ni", "html_name":"&ni;", "html_code":"&#8715;", "description":"содержит"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"", "html_name":"&prod;", "html_code":"&#8719;", "description":"произведение"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\Sigma", "html_name":"&Sigma;", "html_code":"&#8721;", "description":"сумма|сигма"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\Rightarrow", "html_name":"&rArr;", "html_code":"&#8658;", "description":"следует"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\Leftrightarrow", "html_name":"&hArr;", "html_code":"&#8660;", "description":"равносильно"}));


	this.allSymbolsTable.push(new this._Symbol({"latex":"\\alpha", "html_name":"&alpha;", "html_code":"&#945;", "description":"альфа"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\beta", "html_name":"&beta;", "html_code":"&#946;", "description":"бета"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\gamma", "html_name":"&gamma;", "html_code":"&#947;", "description":"гамма"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\delta", "html_name":"&delta;", "html_code":"&#948;", "description":"дельта"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\epsilon", "html_name":"&straightepsilon;", "html_code":"&#1013;", "description":"эпсилон"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\varepsilon", "html_name":"&epsilon;", "html_code":"&#949;", "description":"эпсилон"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\zeta", "html_name":"&zeta;", "html_code":"&#950;", "description":"зета"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\eta", "html_name":"&eta;", "html_code":"&#951;", "description":"эта"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\theta", "html_name":"&theta;", "html_code":"&#952;", "description":"сета"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\vartheta", "html_name":"&thetasym;", "html_code":"&#977;", "description":"сета"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\iota", "html_name":"&iota;", "html_code":"&#953;", "description":"йота"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\kappa", "html_name":"&kappa;", "html_code":"&#954;", "description":"каппа"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\lambda", "html_name":"&lambda;", "html_code":"&#955;", "description":"лямбда"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\mu", "html_name":"&mu;", "html_code":"&#956;", "description":"мю"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\nu", "html_name":"&nu;", "html_code":"&#957;", "description":"ню"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\xi", "html_name":"&xi;", "html_code":"&#958;", "description":"кси"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"o", "html_name":"&omicron;", "html_code":"&#959;", "description":"омикрон"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\pi", "html_name":"&pi;", "html_code":"&#960;", "description":"пи"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\varpi", "html_name":"&piv;", "html_code":"&#982;", "description":"пи"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\rho", "html_name":"&rho;", "html_code":"&#961;", "description":"ро"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\varrho", "html_name":"&varrho;", "html_code":"&#1009;", "description":"ро"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\sigma", "html_name":"&sigma;", "html_code":"&#963;", "description":"сигма"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\varsigma", "html_name":"&sigmaf;", "html_code":"&#962;", "description":"сигма"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\tau", "html_name":"&tau;", "html_code":"&#964;", "description":"тау"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\upsilon", "html_name":"&upsilon;", "html_code":"&#965;", "description":"апсилон"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\phi", "html_name":"&straightphi;", "html_code":"&#981;", "description":"фи"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\varphi", "html_name":"&phi;", "html_code":"&#966;", "description":"фи"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\chi", "html_name":"&chi;", "html_code":"&#967;", "description":"чи"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\psi", "html_name":"&psi;", "html_code":"&#968;", "description":"пси"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\omega", "html_name":"&omega;", "html_code":"&#969;", "description":"омега"}));
	this.allSymbolsTable.push(new this._Symbol({"latex":"\\Sigma", "html_name":"&Sigma;", "html_code":"&#969;", "description":"Сумма|Сигма"}));

	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_small_1_", "key_sym": "a"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_small_2_", "key_sym": "b"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_small_3_", "key_sym": "c"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_small_4_", "key_sym": "d"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_small_5_", "key_sym": "e"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_small_6_", "key_sym": "f"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_small_7_", "key_sym": "g"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_small_8_", "key_sym": "h"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_small_9_", "key_sym": "i"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_small_10_", "key_sym": "j"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_small_11_", "key_sym": "k"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_small_12_", "key_sym": "l"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_small_13_", "key_sym": "m"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_small_14_", "key_sym": "n"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_small_15_", "key_sym": "o"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_small_16_", "key_sym": "p"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_small_17_", "key_sym": "q"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_small_18_", "key_sym": "r"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_small_19_", "key_sym": "s"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_small_20_", "key_sym": "t"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_small_21_", "key_sym": "u"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_small_22_", "key_sym": "v"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_small_23_", "key_sym": "w"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_small_24_", "key_sym": "x"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_small_25_", "key_sym": "y"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_small_26_", "key_sym": "z"}));

	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_big_1_", "key_sym": "A"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_big_2_", "key_sym": "B"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_big_3_", "key_sym": "C"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_big_4_", "key_sym": "D"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_big_5_", "key_sym": "E"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_big_6_", "key_sym": "F"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_big_7_", "key_sym": "G"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_big_8_", "key_sym": "H"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_big_9_", "key_sym": "I"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_big_10_", "key_sym": "J"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_big_11_", "key_sym": "K"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_big_12_", "key_sym": "L"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_big_13_", "key_sym": "M"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_big_14_", "key_sym": "N"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_big_15_", "key_sym": "O"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_big_16_", "key_sym": "P"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_big_17_", "key_sym": "Q"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_big_18_", "key_sym": "R"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_big_19_", "key_sym": "S"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_big_20_", "key_sym": "T"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_big_21_", "key_sym": "U"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_big_22_", "key_sym": "V"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_big_24_", "key_sym": "X"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_big_23_", "key_sym": "W"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_big_25_", "key_sym": "Y"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_eng_alphabet_big_26_", "key_sym": "Z"}));

	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_1_", "key_sym": "а"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_2_", "key_sym": "б"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_3_", "key_sym": "в"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_4_", "key_sym": "г"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_5_", "key_sym": "д"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_6_", "key_sym": "е"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_7_", "key_sym": "ё"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_8_", "key_sym": "ж"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_9_", "key_sym": "з"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_10_", "key_sym": "и"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_11_", "key_sym": "й"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_12_", "key_sym": "к"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_13_", "key_sym": "л"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_14_", "key_sym": "м"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_15_", "key_sym": "н"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_16_", "key_sym": "о"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_17_", "key_sym": "п"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_18_", "key_sym": "р"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_19_", "key_sym": "с"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_20_", "key_sym": "т"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_21_", "key_sym": "у"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_22_", "key_sym": "ф"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_23_", "key_sym": "х"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_24_", "key_sym": "ц"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_25_", "key_sym": "ч"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_26_", "key_sym": "ш"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_27_", "key_sym": "щ"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_28_", "key_sym": "ъ"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_29_", "key_sym": "ы"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_30_", "key_sym": "ь"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_31_", "key_sym": "э"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_32_", "key_sym": "ю"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_small_33_", "key_sym": "я"}));


	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_1_", "key_sym": "А"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_2_", "key_sym": "Б"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_3_", "key_sym": "В"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_4_", "key_sym": "Г"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_5_", "key_sym": "Д"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_6_", "key_sym": "Е"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_7_", "key_sym": "Ё"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_8_", "key_sym": "Ж"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_9_", "key_sym": "З"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_10_", "key_sym": "И"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_11_", "key_sym": "Й"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_12_", "key_sym": "К"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_13_", "key_sym": "Л"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_14_", "key_sym": "М"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_15_", "key_sym": "Н"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_16_", "key_sym": "О"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_17_", "key_sym": "П"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_18_", "key_sym": "Р"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_19_", "key_sym": "С"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_20_", "key_sym": "Т"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_21_", "key_sym": "У"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_22_", "key_sym": "Ф"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_24_", "key_sym": "Х"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_23_", "key_sym": "Ц"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_25_", "key_sym": "Ч"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_26_", "key_sym": "Ш"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_27_", "key_sym": "Щ"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_28_", "key_sym": "Ъ"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_29_", "key_sym": "Ы"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_30_", "key_sym": "Ь"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_31_", "key_sym": "Э"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_32_", "key_sym": "Ю"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name": "_rus_alphabet_big_33_", "key_sym": "Я"}));



	this.allSymbolsTable.push(new this._Symbol({"load_name":"_one_", "key_sym": "1"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name":"_two_", "key_sym": "2"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name":"_three_", "key_sym": "3"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name":"_four_", "key_sym": "4"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name":"_five_", "key_sym": "5"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name":"_six_", "key_sym": "6"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name":"_seven_", "key_sym": "7"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name":"_eight_", "key_sym": "8"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name":"_nine_", "key_sym": "9"}));
	this.allSymbolsTable.push(new this._Symbol({"load_name":"_null_", "key_sym": "0"}));


	this.all3DObjectsTable = new Array();



	this.MainScene = new THREE.Scene();

		//CAMERA
	this.MainCameraSettings = new this._Camera_Settings();
	this.MainScreenParameters = new this._Screen_Parameters();


	this.MainCamera = new THREE.PerspectiveCamera(
										 this.MainCameraSettings.View_Angle, 
										 this.MainCameraSettings.Aspect_Ratio, 
										 this.MainCameraSettings.Near, 
										 this.MainCameraSettings.Far
										 );

	this.MainCamera.position.set(-100,0, 500);
		//END OF CAMERA DEFINITION


	this.MainContainer = document.createElement("div");
	this.MainContainer.style.position = "absolute";
	this.MainContainer.style.top = "-10px";
	this.MainContainer.style.left = "-10px";
	document.body.appendChild(this.MainContainer);


		
		//RENDERER
	this.MainRenderer = new THREE.WebGLRenderer();
	this.MainRenderer.setSize(this.MainScreenParameters.Width, this.MainScreenParameters.Height);
	this.MainContainer.appendChild(this.MainRenderer.domElement);
		//END OF RENDERER DEFINITION

	this.MainControls = new THREE.FirstPersonControls(this.MainCamera);
	this.MainControls.movementSpeed = 2;
	this.MainControls.lookSpeed = 0.001;


	THREEx.WindowResize(this.MainRenderer, this.MainCamera);
	THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });



	this.Starter = function()
	{
		var prom = load3DColladaScene(this.ColladaLoader, "./resources/3D/all.dae");
		prom.then(function(col_scene) {
		for (var i = 0; i < this.allSymbolsTable.length; i++){
			if (this.allSymbolsTable[i].loadName !== null)
				var obj = col_scene.getChildByName(this.allSymbolsTable[i].loadName, true); //присваиваем объект 
			else
				var obj = col_scene.getChildByName("_"+this.allSymbolsTable[i].htmlName.slice(1, -1)+"_", true); //присваиваем объект 
			if (typeof obj === "undefined")
			{
				console.log("we have no object with htmlName " + this.allSymbolsTable[i].htmlName);
			}
			else
			{ // если obj != undefined
				var elem = new MathWorld._Math_Element(); // создаем элемент
				elem.Mesh = obj; //присваиваем объект 
				elem.HTMLSymbol = this.allSymbolsTable[i];
				this.all3DObjectsTable.push(elem); //добавляем в список
			}

		}
	}.bind(this)
// Здесь уже можно работать дальше
		).then(function () {
			window.alert("Starting the world!");
			MathWorld.World();
		});			
	
	}

	this.Starter();// запускаем загрузку всех Ajax ресурсов

};
