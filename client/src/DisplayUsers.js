export default function UsersList({searchText}) {
    2	  // Query all notes in the database
    3	  // (Prisma translates this query to SQL)
    4	  const users = prisma.User.findMany({
    5	    where: {
    6	      name: {
    7	        contains: searchText,
    8	      },
    9	    },
    10	  });
    11	
    12	  // Display notes in React component
    13	  return users.length > 0 ? (
    14	    <ul className="Users">
    15	      {notes.map((note) => (
    16	        <li key={User.id}>
    17	          <SidebarNote note={note} />
    18	        </li>
    19	      ))}
    20	    </ul>
    21	  ) : (
    22	    <div className="notes-empty">
    23	      {searchText
    24	        ? `Couldn't find any notes titled "${searchText}".`
    25	        : 'No notes created yet!'}{' '}
    26	    </div>
    27	  );
    28	}