# Groupify 👥✨

A small tool for generating student groups of varying size.

## To use it...

1. Copy and paste all your student names (line seperated) into the ```students.txt``` file. Make sure any old names that were in there already are deleted.

2. If you have any students that should not be paired together add them to the ```config.json``` file in the pairsToBlock object.

3. Run the script in your terminal with ```$ node script.js```.

4. You'll be prompted to ```input your desired group size```. The script will round up if the exact group size can't be achieved (ie if you input a group size of 3 you may have one or two groups of 4).

5. After you run the script your groups will be in the ```output.txt``` file.

6. Check the output in the terminal to see if there were any issues or left over students.

7. If there are any ```left over students``` in the array in the terminal output add them manually to a group.

8. Double-check to make sure students that weren't supposed to be grouped together aren't grouped together just in case.
