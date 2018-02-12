export default ({
  centered: { display: 'flex', justifyContent: 'center', alignItems: 'center',
              height: 800 },
  reset: {margin: 0, padding: 0},

  hidden: {color: 'white', backgroundColor: 'white'},
  visible: {color: 'black', backgroundColor: 'lightgray'},
  default: {cursor: 'default'},
  pointer: {cursor: 'pointer'},

  header: { position: 'fixed', margin: '0 auto', padding: '15px 10% 12.5px',
            width: '100%', boxSizing: 'border-box', backgroundColor: 'white',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
});
