import React, {useState, useEffect, useRef} from 'react';


const TetrisContext = React.createContext();

function TetrisProvider({children}) {
      
    const [currentColor, setCurrentColor] = useState({});
    const [positionOfCurrentPiece, setPositionOfCurrentPiece] = useState([]);
    const [occupied, setOccupied] = useState([]);   
    const [seconds, setSeconds] = useState(1500); 
    const [trigger, setTrigger] = useState(false); 
    const [score, setScore] = useState("0000005");
    
    const contextRef = useRef([]);
  

    function pickRandomColor() {
        const choices =  ["blue","blueviolet","orangered","olivedrab","fuchsia","forestgreen","firebrick","red","orange","orchid","greenyellow","green","goldenrod","wheat","white","brown"]
        const integer = choices.length;
        const colorNum = Math.floor(Math.random() * integer);
        return choices[colorNum];
     };   
     function pickRandomPositionsOfPiece() {
        const positions = [[25,15,35,5],[15,4,5,16],[14,4,5,13],[15,4,5,25],[15,5,16,25],[15,5,6,25],[14,4,15,5]]
        const int = positions.length;
        const positionsInt = Math.floor(Math.random() * int);
        let picked = positions[positionsInt]
        return picked;
      };
      function settingColors(stateArg) {
        stateArg.borCol = pickRandomColor();
        stateArg.backCol = pickRandomColor();
        return stateArg;
      };
     

// Καθορίζει τι χρώμα θα έχει το κομμάτι που θα είναι σε κίνηση. Το occupied εχει σαν dependency
// θα το δεις παρακατω. Στην ουσία το κομμάτι που κινείται, αν συναντησει εμποδιο απο κάτω, περνάει στα occupied όταν σταθεροποιηθει
// και ξανατρέχει αυτό το effect για να δωσει χρωμα στο νεο κομματι που εμφανιζεται.
 useEffect(()=> {    
     setCurrentColor((currentColor)=> {
     return settingColors(currentColor)
     })
    }, [occupied])    
// όπως πιο πανω συμβαινει με το χρώμα, το ίδιο συμβαίνει και εδω απλά για τις θέσεις του κομματιού.
useEffect(()=> {  
  setPositionOfCurrentPiece((positionOfCurrentPiece) => {
    let result = pickRandomPositionsOfPiece();
    return result;  
  })
}, [occupied])



  
       
     
// Χειριζομαι το πατημα απο τα κουμπια-βελη

 useEffect(() => {
    const rightLeftDownKey = (e) => {
       
        setPositionOfCurrentPiece((positionOfCurrentPiece)=> {
            // δεξια βελος. 
            if (e.keyCode === 39) {
                // Τσεκαρω αν εστω και ενα απο δεξια του υπερβαινει τις ακρες ή αν το δεξια του ειναι κατειλημμενο
                let onePieceRight = positionOfCurrentPiece.some((pos) => {
                  if ((pos + 1) % 10 === 0) {
                    return true;
                } 
                if (contextRef.current.includes(pos + 1)) {
                    return true;
                }
                
                })
                // ολα τα τετραγωνα μετακινημενα κατα ενα δεξια
            let right = positionOfCurrentPiece.map((re)=>{
                return re + 1;
            })  
            //   αν εχω δεξια την ακρη ή καποιο πιασμενο χωρο τοτε να μου επιστρεψει το κομματι οπως ειναι
            if (onePieceRight) {
                return positionOfCurrentPiece;
                // αλλιως να μου επιστρεψει το κομματι με αυξημενα ολα τα τετραγωνα κατα 1 δηλ δεξια
            } else {
                return right;
            }
            } else if (e.keyCode === 37) {
                // ίδια λογική με την κίνηση προς δεξιά
            e.preventDefault();
            let conditionToMove = positionOfCurrentPiece.some((piec) => {
             if (piec % 10 === 0) {
                 return true;
             } 
             if (contextRef.current.includes(piec -1)) {
                return true;
            }

            })
            let onePieceLeft = positionOfCurrentPiece.map(((lp) => {
                return  lp - 1;
            }))
         
        if (conditionToMove) {
             return positionOfCurrentPiece;
        } else {
             return onePieceLeft;
        }
    } else if (e.keyCode === 40) {
        // κίνηση προς τα κάτω με το κάτω βέλος
        // Το preventdefault δεν λειτουργει. ΗΘελα να μην σκρολαρει κατω η πανω 
        //Εψαξα λιγο γι αυτα στο stackoverflow και μενει να το κανω. Μεχρι στιγμης δεν το καταφερα.
        e.preventDefault();
        // 
        if (trigger) {
            return positionOfCurrentPiece;
        }
        let onePieceDown = positionOfCurrentPiece.map((arg) => {
          return  arg + 10;       
        })
        // Αν εστω και ενα απο κατω είναι πιασμένο ή αν εστω και ένα τετραγωνο απο το κομματι που κινειται
        // βρισκεται στην τελευταια γραμμη.
        let collision = positionOfCurrentPiece.some((col) =>{
            if (col >= 210) {
              return true;
            } 
            if (contextRef.current.includes(col + 10)) {
              return true;
            }
        })
        
     if (collision) {
         // εξηγω στο effect που ειναι πιο κατω που αφορα τα occupied γιατι ξανακανω push
         // ενα element που ηδη υπαρχει και να τοθ αλλαξω το length. 
       return  positionOfCurrentPiece.concat(positionOfCurrentPiece[0]);
     } else {
        return onePieceDown;
     }
        
    } else if (e.keyCode === 38) {
        e.preventDefault();
        let newArray = [];
        for (let r=0; r < positionOfCurrentPiece.length; r++){
            newArray[0] = positionOfCurrentPiece[0];
            // Η ιδέα είναι ένα τετράγωνο να παραμένει σταθερό σαν να του έχουμε καρφώσει μια πινεζα
            // και όλα τα γύρω του περιστρέφονται και πέρνουν την ανάλογη θέση μετά απο στροφή 90 μοιρών
            // Το σταθερό κομμάτι είναι πάντα το πρώτο element του array. Η ιδέα αυτή λειτουργεί σωστά
            // σε όλα τα κομμάτια εκτός από το κομμάτι που είναι γραμμή και το άλλο που είναι τετράγωνο
            // οπότε χρειάστηκε να γράψω εξτρα κώδικα γι αυτά τα δυο που είναι εξαιρέσεις στον κανόνα.
            if (positionOfCurrentPiece[r] === positionOfCurrentPiece[0] - 10) {
                newArray[r] = positionOfCurrentPiece[0]  +1;
            }
            if (positionOfCurrentPiece[r] === positionOfCurrentPiece[0] - 10 + 1) {
                newArray[r] = positionOfCurrentPiece[0] + 10 + 1;
            }
            if (positionOfCurrentPiece[r] === positionOfCurrentPiece[0] + 1) {
                newArray[r] = positionOfCurrentPiece[0] + 10;
            }
            if (positionOfCurrentPiece[r] === positionOfCurrentPiece[0] + 10 + 1) {
                newArray[r] = positionOfCurrentPiece[0] + 10 -1;
            }
            if (positionOfCurrentPiece[r] === positionOfCurrentPiece[0] + 10) {
                newArray[r] = positionOfCurrentPiece[0] - 1;
            }
            if (positionOfCurrentPiece[r] === positionOfCurrentPiece[0] + 10 - 1) {
                newArray[r] = positionOfCurrentPiece[0] - 10 - 1;
            }
            if (positionOfCurrentPiece[r] === positionOfCurrentPiece[0] - 1) {
                newArray[r] = positionOfCurrentPiece[0] - 10;
            }
            if (positionOfCurrentPiece[r] === positionOfCurrentPiece[0] - 10 - 1) {
                newArray[r] = positionOfCurrentPiece[0] - 10 + 1;
            }
            // Αφορά την μπάρα
            if (positionOfCurrentPiece[r] === positionOfCurrentPiece[0] - 20) {
                newArray[r] = positionOfCurrentPiece[0] + 2;
            } 
            // Αφορά την μπάρα
            if (positionOfCurrentPiece[r] === positionOfCurrentPiece[0] + 2) {
                newArray[r] = positionOfCurrentPiece[0] - 20;
            }
                               
            
        }
        // Τσεκάρω αν έστω ένα απο τα κομμάτια έχει απο κάτω του κατειλλημένο χώρο ή την τελευταία 
        // γραμμή της πίστας
        let checkCondition = newArray.some((item)=>{
           if (item >=210) {
               return true;
           }
           if (contextRef.current.includes(item + 10)) {
               return true;
           }
        })
        // Αυτο θα μας πει αν μετα την περιστροφη, εστω και ενα τετραγωνο πεφτει πανω σε πιασμενο χωρο
         let superImpose = newArray.some((rot)=>{
             if (contextRef.current.includes(rot)) {
                 return true;
             } else {
                 return false;
             }
         })
         // Η γραμμη οταν είναι κάθετη και είναι στο δεξιά άκρο, αν περιστραφεί περνάει το δεξιά σύνορο
         // οπότε εδω χρειάζεται ενας εξτρα κανόνας γι αυτή την περίπτωση.
          let isBarOnRightMargin = positionOfCurrentPiece.every((ir) => {
              return (ir + 1) % 10 === 0;
          })
          if (isBarOnRightMargin) {
            let minusTwo = newArray.map((mt)=> {
                return mt - 2;
            })
            return minusTwo;
        }
         // Αν ειναι μετα απο την περιστροφη να συμπιπτει καποιο τετραγωνο τοτε να μην γινει η περιστροφη
       if (superImpose) {
        return positionOfCurrentPiece;
       } 
       // Αν ειναι το τετραγωνο κομματι τοτε να το επιστρεφει ως εχει
        if (positionOfCurrentPiece[0] - positionOfCurrentPiece[1] === 10 && positionOfCurrentPiece[2] - positionOfCurrentPiece[3] === 10) {
            return positionOfCurrentPiece;
        }
        // Αν είμαστε στην τέρμα κάτω σειρά, ή έχει τετράγωνα πιασμένα στην κάτω σειρά τότε δεν θέλω να
        // γίνει η περιστροφη και να περάσει κάποιο τετράφωνο το σύνορο. Οπότε κάνω την περιστροφή κανονικά
        // και μετά τα μετακινώ κατα ένα προς τα επάνω για να μην έχω συγκρουση.
       if (positionOfCurrentPiece[0] >= 210 || contextRef.current.includes(positionOfCurrentPiece[0] + 10)) {
            let minusTen = newArray.map((mt) => {
                return mt - 10;
            })
            return minusTen.concat(positionOfCurrentPiece[0],positionOfCurrentPiece[0]);
        }
        // Αν είμαστε στο αριστερά σύνορο δεν θελουμε να γίνει η περιστοφή και κάποιο τετράγωνο να 
        // περάσει το σύνορο. Οπότε κάνω την περιστροφή κανονικά όπως θα την έκανα
        // και μετακινώ όλα τα κομμάτια κατα ένα δεξιά για να πέσει μέσα στην πίστα.
       if (positionOfCurrentPiece[0] % 10 === 0 || contextRef.current.includes(positionOfCurrentPiece[0] -1)) {
            let plusOne = newArray.map((po)=>{
                return po + 1;
            }) 
            return plusOne;
       } 
       // Αν είμαστε στην δεξιά άκρη δεν θέλουμε να γίνει η περιστροφή και κάποιο τετράγωνο να 
       // περάσει το δεξιά σύνορο. Οπότε μετακινώ όλα τα κομμάτια κατα ένα αριστερά.
       if ((positionOfCurrentPiece[0] + 1) % 10 === 0) {
           let minusOne = newArray.map((mo) => {
               return mo - 1;
           })
           return minusOne;
       }      
       // Αν όταν πατηθεί το πανω βέλος, το κάτω κομμάτι είναι πιασμένο ή  πάτος, τότε να γίνει
       // η περιστροφή και να κλειδώσει αμέσως και να εμφανιστεί νέο κομμάτι.
        if (checkCondition) {
            return newArray.concat(positionOfCurrentPiece[0],positionOfCurrentPiece[0]);
        } else {
            return newArray;
        }
        

    }            
})
}
window.addEventListener("keyup", rightLeftDownKey);

}, [])
                 
            

        
            
 // εξηγω στο επομενο τι κανει αυτο το effect.           
      
useEffect(()=> {
    
       let getIndexes = occupied.map((ci)=>{
           return ci.num;
       });       
       contextRef.current = getIndexes;       
       return contextRef;
   
   },[occupied]);

 // Η ιδεα ειναι να εχω ενα array απο objects που το καθε ενα εχει πληροφορια ποιο τετραγωνο δηλ ποιος
 // αριθμος ειναι πιασμενος και με τι χρωματα πρεπει να βαφτει. Αυτο το χρησιμοποιει το table component
 // για να εκτυπωσει τον πινακα οπως πρεπει. Το κακο με τον τροπο που το εστησα ετσι ειναι οτι δεν εχω 
 // καπου τα νουμερα απο τα πιασμενα τετραγωνα και χρειαστηκε να κνω το πιο πανω effect για να αποθηκευονται
 // καπου τα νουμερα που ειναι κατειλημμενα. Αυτο χρειαζεται για να τσεκαρω πριν μετακινηθει ενα κομματι
 // ωστε να μην πεσει πανω σε πιασμενο. Στην πορεια καταλαβα οτι ετσι οπως το εφτιαξα, αν το κομματι που κουνιεται
 // ειχε ακριβως απο κατω του πιασμενο χωρο 'η τον πατο, αυτοματως γινόταν κατειλημμενο και εμφανιζοταν αμεσως 
 // το επομενο κομματι αλλα ετσι δεν μπορει να παιχτει το παιχνιδι γιατι ο παικτης μπορει να θελει να κανει
 // μια επιπλεον κινηση δεξια η αριστερα για να το σφηνωσει μεσα σε κανενα κενο. Η λυση που σκεφτηκα και ας μην ειναι
 // πολυ καλη, οταν το κομματι που κινειται βρισκει απο κατω τον πατο η αλλο κομματι σταθερο, να γινεται push
 // στο array αυτο ξανα το πρωτο element οποτ δεν αλλαζει αυτο που απεικονιζεται αλλα αλλαζει το length
 // και ετσι το κομματι γινεται σταθερο μονο οταν το length του γινει μεγαλυτερο του 6 και αρα του δινω 
 // ενα ακομη render οσο θα ειναι ισο με 5 για να μπορει κανει ο παικτης την κινηση. Ειναι παραξενη λυση
 // που ευτυχως λειτουργησε.

 useEffect(()=> {
    setOccupied((occupied) => {            
       
    if  (positionOfCurrentPiece.length >= 6) {
        let objectsToConcat = positionOfCurrentPiece.map((newOccupiedCell)=> {
        return { num: newOccupiedCell, brdr: currentColor.borCol, bck: currentColor.backCol}
        })
          return occupied.concat(objectsToConcat);
        } else {
          return occupied;
        }            
       })

 },[positionOfCurrentPiece])     



// Αυτο είναι για να καθορίσει αν πέρασε το όριο και αν τελείωσε ουσιαστικά το παιχνίδι

useEffect(()=>{
    setTrigger((trigger)=> {
     let condition = positionOfCurrentPiece.some((pocp)=>{
         return contextRef.current.includes(pocp)})
    return condition ? true : false;
    })
  },[positionOfCurrentPiece])

  useEffect(()=>{
   console.log(contextRef.current.length)
  },[positionOfCurrentPiece])
  
        
        
        
useEffect(()=> {
       const belated = setInterval(()=> {
          setPositionOfCurrentPiece((positionOfCurrentPiece)=>{   
                   
          let check =  positionOfCurrentPiece.some((elem) => {
                if (contextRef.current.includes(elem + 10)) {
                    return true;
                } 
                if (elem < 210) {
                    return false;
                } else {
                    return true;
                }
            })
          let plusTen = positionOfCurrentPiece.map((pop) => {
              return pop + 10;
          })
          if (trigger) {
              return positionOfCurrentPiece;
          }
          if (check) {          
              let itemToConcat = positionOfCurrentPiece[0];    
              let newPositions = positionOfCurrentPiece.concat(itemToConcat);
            return newPositions;
          } else {
              return plusTen;
          }
            
          }) 
        },seconds);
        return () => clearInterval(belated);
        }, [seconds,trigger]
        ) 

        // Αυτό είναι για την αλλαγή της ταχύτητας. Κάθε 3 λεπτά το έχω βάλει να αλλάζει τα 
        // seconds που αν δεις είναι στο setInterval πιο πανω για να μετακινει το κομμάτι που είναι
        // σε κίνηση
  useEffect(()=> {
            const changeSpeed = setInterval(()=> {
               setSeconds((seconds)=>{   
                return seconds <= 500 ? seconds : seconds - 200;                               
               }) 
             },180000);
             return () => clearInterval(changeSpeed);
             }, []
             ) 


// Εδώ υπολογίζω το score. Για λόγους ομορφιάς ήθελα να το βάλω να έχει leading zeros όπως λένε
// στα Αγγλικά δηλαδή μηδενικά πριν απο τον αριθμό. Γι αυτο μετατρεπω καθε φορα το string σε αριθμο με
// το parseInt και κανω υπολογισμους και το ξανακανω  string και το επιστρεφω
useEffect(()=>{
  setScore((score)=>{
      let parsed = parseInt(score);      
          
      let newScore = parsed + 5;   
      let stringedLength = newScore.toString().length; 
      let digits = 7 - stringedLength; 
      let arrToJoin = [];
      arrToJoin.length = 7;
      arrToJoin.fill(0,0,digits);
      arrToJoin.push(newScore); 
         if (trigger) {
             return score;
         } else {
      return arrToJoin.join("");
         }
  })
},[positionOfCurrentPiece])
        
        

        
            

         
       return (
           <TetrisContext.Provider ref={contextRef} value={{
               refer : contextRef,
               initialPosition: positionOfCurrentPiece, 
               currCol : currentColor,        
               occ: occupied,                           
               trigg: trigger,
               points : score
                        
           }}>
               {children}
           </TetrisContext.Provider>
               )
           }
           const TetrisConsumer =  TetrisContext.Consumer;   
       
           export { TetrisProvider, TetrisContext, TetrisConsumer}    


    
            







      
   

    



   


