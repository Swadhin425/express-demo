const express= require('express');

const router= express.Router();
const members= require('../data/members');
const uuid= require('uuid');


//get all members
router.get("/", function (req, res) {
    res.json(members);
  });
  
  //get a single member
  router.get("/:id", (req, res) => {
    var found = members.some((member) => member.id == req.params.id);
    if (found) {
      res
        .status(200)
        .json(members.filter((member) => member.id == req.params.id));
    } else {
      res.status(400).json({ message: "member not found " });
    }
  });
  
  
  //create a member
  router.post("/", (req, res) => {
      
     const newMember={
         id:uuid.v4(),
         name: req.body.name,
         username:req.body.username,
         email: req.body.email
     }
     if(!newMember.name || !newMember.email || !newMember.username){
         res.status(400).json({message:"please enter email,username,and name"})
     }
  
     members.push(newMember);
     res.status(200).json({message:"Member created",members})
    });

    //update the member

    router.put('/:id',(req,res)=>{
      const found=members.some(member=> member.id === parseInt(req.params.id))
      if(found){
          const updatedMember=req.body;
          members.forEach(member=>{
              if(member.id === parseInt(req.params.id)){
                  member.name=updatedMember.name ? updatedMember.name : member.name;
                  member.email=updatedMember.email? updatedMember.email : member.email;
                  member.username=updatedMember.username? updatedMember.username : member.username;
                  res.json({message:"member updated"});
              }
          })
      }else{
          res.status(400).json({message:`${req.params.id}  is not found,please enter a valid id`})
      }

  })

  //delete a memeber

   router.delete('/:id',(req,res)=>{
    const found=members.some(member=> member.id === parseInt(req.params.id))

    if(found){

      members.forEach((member,index)=> {
        if(member.id === parseInt(req.params.id)){
      
          console.log("found id")
          members.splice(index,1);
          console.log(members);
        }
      })
      //res.json({members: members.filter(member=> member.id !== parseInt(req.params.id))})
      res.json({members:members })

     
    }else{
      res.status(400).json({message:`${req.params.id}  is not found,please enter a valid id`})
    }
   })
    module.exports=router;
    