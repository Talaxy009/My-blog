#include <iostream>
#include <iomanip>
#include <fstream>
#include <sstream>
#include <Windows.h>
using namespace std;

int main(int argc, char *argv[])
{
    string flodeName, fileName, command, date;
    fstream index;
    ostringstream format;
    SYSTEMTIME rawtime;
    if (argc == 1)
    {
        cout << "Please input the name of new article\n: ";
        cin >> flodeName;
    }
    else
    {
        flodeName = argv[1];
    }
    command = "mkdir .\\content\\blog\\" + flodeName;
    system(command.c_str());
    fileName = ".\\content\\blog\\" + flodeName + "\\index.md";
    index.open(fileName, ios::out);
    if (!index)
    {
        cout << "Creating index.md fail!";
        exit(0);
    }
    GetLocalTime(&rawtime);
    format << "\"" << rawtime.wYear << '-'
           << setw(2) << setfill('0') << setiosflags(ios::right) << rawtime.wMonth << '-'
           << setw(2) << setfill('0') << setiosflags(ios::right) << rawtime.wDay << 'T'
           << setw(2) << setfill('0') << setiosflags(ios::right) << rawtime.wHour << ':'
           << setw(2) << setfill('0') << setiosflags(ios::right) << rawtime.wMinute << ':'
           << setw(2) << setfill('0') << setiosflags(ios::right) << rawtime.wSecond << '.'
           << setw(3) << setfill('0') << setiosflags(ios::right) << rawtime.wMilliseconds << "Z\"";
    date = format.str();
    index << "---\ntitle: \ndate: " << date << "\ndescription: \nimg: \"./img.png\"\n---\n";
    index.close();
    cout<<"Created successfully!"<<endl;
    system("pause");
    return 0;
}
