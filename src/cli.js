import arg from 'arg';

const flatCache = require('flat-cache');
function passArgumentIntoOptions(rawargs){

    const args = arg({
        '--git' : Boolean,
        '--yes' : Boolean,
        '--install' : Boolean,
        '-g' : 'git',
        '-y' : '--yes',
        '-i' : '--install'
    },{
        argv: rawargs.slice(2),
    });
    return {
        skipPrompts: args['yes'] || false,
        git: args['--git'] || false,
        key: args._[1], //argument passer
        value: args._[2],
        runInstall: args['--install'] || false,
        process:args._[0],
    };
}
export function cli (args){
    
    let options = passArgumentIntoOptions(args);
    let cache = flatCache.load('productsCache');
    switch (options.process) {
        case 'add':
          if(options.key !=='' && options.value !==''){
            cache.setKey(options.key, options.value);
            cache.save();
          }
          break;
        case 'remove':
            if(options.key !=='' && options.value !==''){
                cache.removeKey(options.key);
                cache.save(); 
            }
          
          break;
        case 'get':
            let keyValue = cache.getKey(options.key);
            if(keyValue !== undefined)
            {
                console.log(cache.getKey(options.key));
            }
          else{
            console.log('No values for provided keys');
          }
          cache.save();
          break;
        default:
          alert( "I don't know such values" );
      }
    
    }
   
