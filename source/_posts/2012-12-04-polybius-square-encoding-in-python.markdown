---
layout: post
title: "Polybius Square Encoding in Python"
date: 2012-12-04 16:17
comments: true
categories: [python, math, crytopraphy] 
---
I was recently trying to figure out an efficient way to programatically
encode or decode a string into an ADFGX cipher, a (by todays standards)
simple cipher that involves fractionating the string through use of a
Polybius square (using a mixed alphabet), and then performing a columnar
transposition on the result. If you want to read more about the cipher
itself, Wikipedia has a good write up of it [here](http://en.wikipedia.org/wiki/ADFGVX_cipher).

I don't want to go too far into the specifics of the cipher itself, as
this post is meant to focus on the first part, encoding a string using a
Ploybius square, and, what I feel at least, is a rather clever way
of doing it.
i<!-- more -->
So, a Polybius sqaure essentially looks like this:

<table>
  <tr>
    <th> </th>
    <th>A</th>
    <th>D</th>
    <th>F</th>
    <th>G</th>
    <th>X</th>
  </tr>
  <tr>
    <td>A</td>
    <td>b</td>
    <td>t</td>
    <td>a</td>
    <td>l</td>
    <td>p</td>
  </tr>
  <tr>
    <td>D</td>
    <td>d</td>
    <td>h</td>
    <td>o</td>
    <td>z</td>
    <td>k</td>
  </tr>
  <tr>
    <td>F</td>
    <td>q</td>
    <td>f</td>
    <td>v</td>
    <td>s</td>
    <td>n</td>
  </tr>
  <tr>
    <td>G</td>
    <td>g</td>
    <td>j</td>
    <td>c</td>
    <td>u</td>
    <td>x</td>
  </tr>
  <tr>
    <td>X</td>
    <td>m</td>
    <td>r</td>
    <td>e</td>
    <td>w</td>
    <td>y</td>
  </tr>
</table>

To encode a string, you simply take the row header of the letter, and
concatenate the column header of the letter. So, the letter a would be
AF, b would be AA, c would be GF and so on. You may notice that the
square is missing the letter i. In the interest of keeping it square, i
has been combined with j. There is a slightly modified version of the
ADFGX cipher, the ADFGVX cipher, that can accomodate for the missing i,
as well as several other characters, such as numbers.

Anyways, at first glance, doing these encodings programatically looks
simple, just look up the row and column of each letter, and combine
them. And to be sure, in theory, it is fairly simple. My first attempt
involved making two, two dimensional associative  arrays, and looping through them
(using the letters ADFGX as the keys) and getting the corresponding
ciper text as the result. While this worked, it did not work well, and
was subject to one major problem: what if you wanted to change the mixed
alphabet? That would involve rewriting each array by hand. Not much fun.
So, my goal was to make it easier to change out the mixed alphabet, and
also find something that would run faster than O(n^2).

The solution I eventually stumbled upon involves representing the mixed
alphabet not as an array, or arrays, but as a simple string. So, the
above mixed alphabet would look like "btalpdhozkqfvsngjcuxmrewy". Using
what we know about the workings of the Polybius square, we can make some
assumptions about what letters correspond to which column and row
headers.First off, to get the row, we can use simple integer division on
the position of each character. We know that the polybius square is 5 x
5, so, each row will have 5 characters. We can divide the character
position in the mixed alphabet string by 5, and figure out the row its
in. 0/5 = 0, 1/5 = 0, 2/5 = 0 etc. Since we are using ints rather than
floats, we can be assured to only get whole numbers. If you continue in
this, you'll see that once we get to char[5], we've moved to a new row (5/5 =
1).Since we have at most 25 characters in our square, this works quite
nicely.

Next, to determine the column, we can use a similar method, replacing
the division with the modulus function. Using the index of each
character, char[n], and calculating char[n] modulus 5, we can easily
figure out which column each character will fall into. 0 % 5 = 0, 1 %
5 = 1 ... 7 % 5 = 2 ...10 % 5 = 0 ... 17 % 5 = 2 ... 24 % 5 = 4 and so
on. 

Each of these methods will generate a number from 0 to 4, which we can
then use as an index into the string "ADFGX" to figure out which letter
each corresponds to in the Polybius square. Then, just concatenate both
letters (with the column being the first), and done, you have an encoded
letter.

The best part, this runs in O(n). Oh, and you can specify a mixed
alphabet very easily. The code, in Python, I wrote for this
is as follows:

{% codeblock encode_as_polybius_square lang:python %}
def encode_as_polybius_square(mixed_alphabet, cipher_text):
    encoded_text = ""
    key = "ADFGX"

    #Strip all spaces and lowercase the whole string
    cipher_text = cipher_text.strip(' ').replace(" ", "").lower()
    
    for character in cipher_text:
        #Get the row header of the character, generating an
        #index into the key
        column_char = key[mixed_alphabet.index(character) / 5]
        #Get the column header in the same manner
        row_char = key[mixed_alphabet.index(character) % 5]
        #Combine the row header with the column header
        encoded_text += column_char + row_char

    return encoded_text
{% endcodeblock %}

So, there you have it. A fast, simple way to encode a string based on a
Polybius square.

Next time, decoding the same string. Haven't quite thought that out
yet...
