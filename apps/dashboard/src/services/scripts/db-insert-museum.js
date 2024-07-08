import { db } from '../../utils/db';
import { museums } from 'db/schema'; 

export async function seedData() {
  db.insert(museums).values([
    { id: 1, name: 'The M', clerkOrganizationId: 'org_2hbKa8xBob1HCaaWDuFCTuwHsP6' },
    { id: 2, name: 'The British Museum', clerkOrganizationId: 'org456' },
    { id: 3, name: 'The Met', clerkOrganizationId: 'org789' },
  ]).run();


  return ('Data seeded successfully!');
}

seedData().catch(err => {
  console.error('Error seeding data:', err);
});

