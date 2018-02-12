export let height = window.innerHeight;

//doesn't work
window.addEventListener('resize', () => { height = window.innerHeight; });

export default ({
  centered: {justifyContent: 'center', alignItems: 'center', height},
  header: { position: 'fixed', margin: '0 auto', padding: '15px 10% 12.5px',
            width: '100%', boxSizing: 'border-box', backgroundColor: 'white' },
  reset: {margin: 0, padding: 0},
  hidden: {color: 'white', backgroundColor: 'white'},
  visible: {color: 'black', backgroundColor: 'lightgray'},
  default: {cursor: 'default'},
  pointer: {cursor: 'pointer'},
});
