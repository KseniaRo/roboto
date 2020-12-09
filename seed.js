const { green, red } = require('chalk');
const { db, Project, Robot } = require('./server/db');

const seed = async () => {
  try {
    await db.sync({ force: true });


    const project_1 = await Project.create({
      title: 'Save the World from Mimikians',
      deadline: new Date(2020, 11, 15),
      priority: 9,
      description: 'Mimikians are very nesty ino-parasites. If we will not take care of it immediately. They will trash our planet within 3 days with the used plastic.'
    })

    const project_2 = await Project.create({
      title: 'Feed the Humans',
      deadline: new Date(2020, 11, 10),
      priority: 6,
      description: 'We need to make sure that our humans fed.Other ways they will die. They are fragile and we need to take care of them.'
    })

    const project_3 = await Project.create({
      title: 'Find new pet for Queen',
      deadline: new Date(2020, 11, 17),
      priority: 3,
      description: 'Our Queen has new project for us. But we will try to slow down the process, because she use to change her mind very quickly.'

    })
    const finn = await Robot.create({
      name: 'Finn-01',
      fuelType: 'diesel',
      fuelLevel: 5,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE30tv_PH6GYSCmF6Fa7OKKwoHX_8x0vd3YA&usqp=CAU'
    })

    const fiona = await Robot.create({
      name: 'Fiona-01',
      fuelLevel: 8,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdo2DOeg1p-oAgnkzNQqrtzBLW6FAl_QYE1Q&usqp=CAU'
    })

    const jake = await Robot.create({
      name: 'Jake-01',
      fuelType: 'gas',
      fuelLevel: 3,

      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjuxqogCvwXdTL0wmvb2pJ-ARRrTuZzXa4ZA&usqp=CAU'
    })

    await project_3.addRobot(finn)
    await fiona.addProject(project_1)
    await jake.addProject(project_2)
    await project_2.addRobot(fiona)
    await project_2.addRobot(finn)


  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch((err) => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}
