function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "yellow",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "yellow",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

const DataNav = [
  {
    title: 'Acadmeic',
    url: '',
    submenu: [
      {
        title: 'school',
        url: '',
        submenu: [
          {
            title: 'class 1-5',
            url: 'school/class 1-5',
          },
          {
            title: 'class 6',
            url: 'school/class 6',
          },
          {
            title: 'class 7',
            url: 'school/class 7',
          },

          {
            title: 'class 8',
            url: 'school/class 8',
          },
          {
            title: 'class 9',
            url: 'school/class 9',
          },
          {
            title: 'class 10',
            url: 'school/class 10',
          },
          {
            title: 'class 11',
            url: 'school/class 11',
          },
          {
            title: 'class 12',
            url: 'school/class 12',
          },

        ],
      },
      {
        title: 'college',
        url: '',
        submenu: [
          {
            title: 'b tech',
            url: 'college/b tech',
          },
          {
            title: 'bsc',
            url: 'college/bsc',
          },
          {
            title: 'b com',
            url: 'college/b com',
          },
          {
            title: 'b.a',
            url: 'college/b.a',
          },
          {
            title: 'bba',
            url: 'college/bba',
          },
          {
            title: 'diploma',
            url: 'college/diploma',
          },
          {
            title: 'other',
            url: 'college/other',
          },
        ],
      },
      {
        title: 'subject',
        url: '',
        submenu: [
          {
            title: 'Math',
            url: 'subject/Math',
          },
          {
            title: 'Science',
            url: 'subject/Science',
          },
          {
            title: 'Social Science',
            url: 'subject/Social Science',
          },
          {
            title: 'English',
            url: 'subject/English',
          },
          {
            title: 'Commerce',
            url: 'subject/Commerce',
          },
          {
            title: 'Arts',
            url: 'subject/Arts',
          },
          {
            title: 'Hindi',
            url: 'subject/Hindi',
          },
          {
            title: 'IT',
            url: 'subject/IT',
          },
          {
            title: 'Physical Education',
            url: 'subject/Physical Education',
          },
        ],
      },

    ],
  },
  {
    title: 'Creative Fields',
    url: '',
    submenu: [
      {
        title: 'language',
        url: '',
        submenu: [
          {
            title: 'Hindi',
            url: 'language/Hindi',
          },
          {
            title: 'english',
            url: 'language/English',
          },
          {
            title: 'russian',
            url: 'language/Russian',
          },
          {
            title: 'chinese',
            url: 'language/Chinese',
          },
          {
            title: 'french',
            url: 'language/French',
          },
          {
            title: 'japnese',
            url: 'language/Japnese',
          },
          {
            title: 'sanskrit',
            url: 'language/Sanskrit',
          },
          {
            title: 'other',
            url: 'language/other',
          },
        ],
      },
      {
        title: 'Learn hobbies',
        url: '',
        submenu: [
          {
            title: 'dance',
            url: 'hobbies/dance',
          },
          {
            title: 'music',
            url: 'hobbies/music',
          },
          {
            title: 'drawing',
            url: 'hobbies/drawing',
          },
          {
            title: 'guitar',
            url: 'hobbies/guitar',
          },
          {
            title: 'art & craft',
            url: 'hobbies/art & craft',
          },
          {
            title: 'piano',
            url: 'hobbies/piano',
          },
          {
            title: 'painting',
            url: 'hobbies/painting',
          },
          {
            title: 'photography',
            url: 'hobbies/photography',
          },
          {
            title: 'singing',
            url: 'hobbies/singing',
          },
          {
            title: 'other',
            url: 'hobbies/other',
          },
        ],
      },

    ],
  },

];
const settings = {
  infinite: true,
  nextArrow: <SampleNextArrow className="" />,
  prevArrow: <SamplePrevArrow />,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const studyMode = [{ value: "Online", label: "Online" }, { value: "Offline", label: "Offline" }]
const studyTerm = [{ value: "1 Day", label: "1 Day" }, { value: "1 Week", label: "1 Week " }, { value: "2 Week", label: "2 Week" }, { value: "3 Week", label: "3 Week" }, { value: "1 Month", label: "1 Month" }]
const studyHours = [{ value: "1 Hour", label: "1 Hour" }, { value: "1.5 Hour", label: "1.5 Hour" }, { value: "2 Hour", label: "2 Hour" }, { value: "2.5 Hour", label: "2.5 Hour" }, { value: "3 Hour", label: "3 Hour" }]
const priceValueDays = { "1 Day": 1, "1 Week": 6, "2 Week": 12, "3 Week": 18, "1 Month": 24 }
const priceValuesHours = { "1 Hour": 1, "1.5 Hour": 1.5, "2 Hour": 2, "2.5 Hour": 2.5, "3 Hour": 3 }
export { DataNav, settings, studyMode, studyTerm, studyHours, priceValueDays, priceValuesHours };




